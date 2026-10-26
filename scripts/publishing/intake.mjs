import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {mkdir,readFile,writeFile,rename} from 'node:fs/promises';
import {homedir} from 'node:os';
import {resolve,join} from 'node:path';
import {pathToFileURL} from 'node:url';
export let sourceRepo=process.env.PLAYBOOK_REPORT_REPO||'';
export const reportPath=p=>/^reports\/security\/\d{4}\/\d{2}\/\d{4}-\d{2}-\d{2}\.md$/.test(p);
export const fingerprint=(path,body)=>createHash('sha256').update(path+'\0'+body).digest('hex');
export function publicUpdateUrl(value){const u=new URL(value);if(u.origin!=='https://nekoai-lab.github.io'||!/^\/ai-security-playbook\/updates\/[a-z0-9-]+\/$/.test(u.pathname)||u.search||u.hash)throw Error('Expected canonical public update URL');return u.href;}
const gh=(...args)=>execFileSync('gh',args,{encoding:'utf8',maxBuffer:16*1024*1024,timeout:60000});
const api=path=>JSON.parse(gh('api',`repos/${sourceRepo}/${path}`));
export async function scanReports({apiCall=api,prList=()=>JSON.parse(gh('pr','list','-R',sourceRepo,'--state','open','--limit','100','--json','number,headRefOid,updatedAt')),readText=(path,ref)=>gh('api',`repos/${sourceRepo}/contents/${path}?ref=${ref}`,'-H','Accept: application/vnd.github.raw+json')}={}){
 const head=apiCall('commits/main');const tree=apiCall(`git/trees/${head.sha}?recursive=1`);if(tree.truncated)throw Error('Report tree truncated; do not claim complete intake');
 const skipped=[]; const touched=new Set();
 const entries=tree.tree.filter(x=>x.type==='blob'&&reportPath(x.path)).map(x=>({path:x.path,ref:head.sha,origin:'main'}));
 const prs=prList().sort((a,b)=>(a.updatedAt||'').localeCompare(b.updatedAt||'')||a.number-b.number);if(prs.length>=100)throw Error('Open PR list limit reached; intake may be incomplete');
 for(const pr of prs){
  const files=[];for(let page=1;page<=30;page++){const batch=apiCall(`pulls/${pr.number}/files?per_page=100&page=${page}`);files.push(...batch);if(batch.length<100)break;if(page===30)throw Error('PR file limit reached');}
  if(!files.some(f=>reportPath(f.filename)))continue;
  const comparison=apiCall(`compare/${head.sha}...${pr.headRefOid}`);
  if(!Number.isInteger(comparison.behind_by))throw Error('Cannot establish report branch freshness');
  if(comparison.behind_by>0){skipped.push({origin:`PR #${pr.number}`,reason:'behind main; rebase report PR before intake'});continue;}

  for(const f of files.filter(f=>reportPath(f.filename))){if(touched.has(f.filename))throw Error('Conflicting current report PRs; resolve before intake');touched.add(f.filename);if(f.status==='removed')throw Error('Report pending deletion; stop intake');}
  entries.push(...files.filter(f=>f.status!=='removed'&&reportPath(f.filename)).map(f=>({path:f.filename,ref:pr.headRefOid,origin:`PR #${pr.number}`})));
 }
 // PRs were sorted oldest first by GitHub updatedAt, then number. The latest revision wins.
 // Never execute any scripts or rules supplied by the report PR.
 const latest=new Map(entries.map(e=>[e.path,e])),out=[];
 for(const e of [...latest.values()].sort((a,b)=>b.path.localeCompare(a.path))){const body=readText(e.path,e.ref);if(Buffer.byteLength(body)>512000)throw Error(`Oversized report: ${e.path}`);out.push({...e,hash:fingerprint(e.path,body),body});}
 out.skipped=skipped;return out;
}
async function main(){
 const dir=resolve(process.env.PLAYBOOK_INTAKE_STATE||join(homedir(),'.local/state/ai-security-playbook-intake'));await mkdir(dir,{recursive:true,mode:0o700});
 const file=join(dir,'ledger.json');let ledger={version:1,reports:{}};try{ledger=JSON.parse(await readFile(file,'utf8'));}catch(e){if(e.code!=='ENOENT')throw e;}
 const [command='scan',hash,...args]=process.argv.slice(2);
 if(!sourceRepo)sourceRepo=JSON.parse(await readFile(join(dir,'source.json'),'utf8')).repo;
 if(!/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(sourceRepo))throw Error('Invalid source repository');
 if(command==='scan'){
  const reports=await scanReports();const pending=[];
  for(const {body,...entry}of reports){const old=ledger.reports[entry.hash];if(old?.status==='published'||old?.status==='internal-only')continue;const raw=join(dir,entry.hash+'.md');await writeFile(raw,body,{mode:0o600});pending.push({...entry,file:raw,status:old?.status||'pending',reason:old?.reason});}
  console.log(JSON.stringify({sourceRepo,scanned:reports.length,skipped:reports.skipped,pending},null,2));return;
 }
 if(!/^[a-f0-9]{64}$/.test(hash||''))throw Error('Invalid report fingerprint');
 await readFile(join(dir,hash+'.md')); // only acknowledge content actually scanned
 if(command==='published'){
  if(!args.length)throw Error('Published URLs required');const urls=args.map(publicUpdateUrl);
  for(const url of urls){const response=await fetch(url,{redirect:'error',signal:AbortSignal.timeout(30000)});if(response.status!==200)throw Error(`Publication not ready: ${url}`);const html=await response.text();if(!html.includes('application/ld+json')||!html.includes(`href="${url}"`))throw Error('Live canonical/structured data mismatch');}
  ledger.reports[hash]={status:'published',urls,at:new Date().toISOString()};
 }else if(command==='hold'||command==='internal-only'){
  if(!args.join(' ').trim())throw Error('Reason required');ledger.reports[hash]={status:command==='hold'?'blocked':'internal-only',reason:args.join(' '),at:new Date().toISOString()};
 }else throw Error('Use scan / published HASH URL... / hold HASH REASON / internal-only HASH REASON');
 const tmp=file+'.tmp';await writeFile(tmp,JSON.stringify(ledger,null,2)+'\n',{mode:0o600});await rename(tmp,file);console.log(JSON.stringify(ledger.reports[hash]));
}
if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href)main().catch(e=>{console.error(e.message);process.exitCode=1;});
