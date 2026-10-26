import{execFileSync}from'node:child_process';import{join}from'node:path';import{homedir}from'node:os';import{assertPublication}from'./policy.mjs';
const[number]=process.argv.slice(2);if(!/^\d+$/.test(number||''))throw Error('PR number required');
const repo='nekoai-lab/ai-security-playbook',gh=(...args)=>JSON.parse(execFileSync('gh',args,{encoding:'utf8',maxBuffer:16*1024*1024}));
const read=()=>gh('pr','view',number,'-R',repo,'--json','state,baseRefName,headRefOid,statusCheckRollup,labels');
const initial=read();
const files=gh('api',`repos/${repo}/pulls/${number}/files?per_page=100`);if(files.length>=100)throw Error('File list may be truncated');
const mapped=files.map(f=>({path:f.filename,status:f.status}));
// This executable is outside the reviewed repo and uses the base QA rules and an independent AI.
// A caller-written comment is never accepted as evidence: invoke a fresh review ourselves.
const runner=join(homedir(),'Projects/ai-dev-harness/bin/request-qa');
const output=execFileSync(runner,[number,'--repo','ai-security-playbook','--implementer','codex','--reviewer','cursor'],{encoding:'utf8',maxBuffer:4*1024*1024,timeout:1200000});
const links=[...output.matchAll(/https:\/\/github\.com\/nekoai-lab\/ai-security-playbook\/pull\/\d+#issuecomment-(\d+)/g)];
if(!links.length)throw Error('Harness did not return a fresh QA comment');
const commentId=Number(links.at(-1)[1]);
const pr=read();if(pr.headRefOid!==initial.headRefOid)throw Error('HEAD moved during QA');
pr.files=mapped;
pr.comments=gh('api',`repos/${repo}/issues/${number}/comments?per_page=100`,'--paginate','--slurp').flat().map(c=>({id:c.id,body:c.body}));
const head=assertPublication(pr,{head:initial.headRefOid,commentId});
const comparison=gh('api',`repos/${repo}/compare/main...${head}`);if(comparison.behind_by!==0)throw Error('Publication branch is behind main; rebase and repeat QA/CI');
if(pr.files.some(f=>f.path==='design/review-map.json')){const readMap=ref=>JSON.parse(Buffer.from(gh('api',`repos/${repo}/contents/design/review-map.json?ref=${ref}`).content,'base64').toString());const before=readMap('main'),after=readMap(head);for(const p of before.pages)if(!after.pages.includes(p))throw Error('Cannot remove existing review targets');for(const k of Object.keys(before))if(k!=='pages'&&JSON.stringify(before[k])!==JSON.stringify(after[k]))throw Error('Cannot alter design contract');}
console.log(JSON.stringify({repo,number,reviewedHead:head,reviewCommentId:commentId,ready:true}));
