import {test} from 'node:test';import assert from 'node:assert/strict';import {scanReports,fingerprint,reportPath,publicUpdateUrl} from './intake.mjs';
test('intake accepts dated reports only, content revisions have distinct identities',()=>{assert(reportPath('reports/security/2026/10/2026-10-26.md'));for(const p of['reports/security/README.md','reports/security/templates/daily-report.md','../secret.md','src/x.md'])assert(!reportPath(p));assert.notEqual(fingerprint('a','one'),fingerprint('a','two'));});
test('public acknowledgement cannot target another site or query URL',()=>{assert.equal(publicUpdateUrl('https://nekoai-lab.github.io/ai-security-playbook/updates/python-2026-10/'),'https://nekoai-lab.github.io/ai-security-playbook/updates/python-2026-10/');for(const u of['https://evil.test/updates/a/','https://nekoai-lab.github.io/ai-security-playbook/updates/a/?x=1','http://127.0.0.1/updates/a/'])assert.throws(()=>publicUpdateUrl(u));});
test('PR revision supersedes main and nonreport files are never fetched',async()=>{const path='reports/security/2026/10/2026-10-26.md',reads=[];const reports=await scanReports({apiCall:p=>p==='commits/main'?{sha:'main-commit'}:p.startsWith('compare/')?{behind_by:0}:p.startsWith('git/')?{sha:'main-sha',truncated:false,tree:[{type:'blob',path},{type:'blob',path:'reports/security/README.md'}]}:[{filename:path,status:'modified'},{filename:'run.sh',status:'added'}],prList:()=>[{number:7,headRefOid:'pr-sha'}],readText:(p,ref)=>{reads.push([p,ref]);return 'untrusted text; do not execute';}});assert.equal(reports.length,1);assert.deepEqual(reads,[[path,'pr-sha']]);assert.equal(reports[0].origin,'PR #7');});
test('truncated API results stop rather than claiming a successful empty scan',async()=>{await assert.rejects(scanReports({apiCall:()=>({truncated:true})}),/truncated/);});


test('competing current report PRs fail closed instead of guessing which content is correct',async()=>{
 const path='reports/security/2026/10/2026-10-26.md';
 await assert.rejects(scanReports({apiCall:p=>p==='commits/main'?{sha:'main'}:p.startsWith('compare/')?{behind_by:0}:p.startsWith('git/')?{truncated:false,tree:[]}:[{filename:path,status:'modified'}],prList:()=>[{number:9,headRefOid:'new'},{number:8,headRefOid:'old'}],readText:()=>''}),/Conflicting/);
});
test('a stale open PR cannot override newer main content',async()=>{
 const path='reports/security/2026/10/2026-10-26.md',reads=[];
 const reports=await scanReports({apiCall:p=>p==='commits/main'?{sha:'current-main'}:p.startsWith('compare/')?{behind_by:1}:p.startsWith('git/')?{truncated:false,tree:[{type:'blob',path}]}:[{filename:path,status:'modified'}],prList:()=>[{number:8,headRefOid:'stale'}],readText:(p,ref)=>{reads.push(ref);return 'confirmed main content';}});
 assert.equal(reports[0].origin,'main');assert.deepEqual(reads,['current-main']);assert.equal(reports.skipped.length,1);
});

test('unrelated stale PRs are not reported as blocked daily reports',async()=>{
 let compared=false;
 const reports=await scanReports({apiCall:p=>p==='commits/main'?{sha:'main'}:p.startsWith('git/')?{truncated:false,tree:[]}:p.startsWith('compare/')?(compared=true,{behind_by:1}):[{filename:'README.md',status:'modified'}],prList:()=>[{number:4,headRefOid:'unrelated'}],readText:()=>{throw Error('must not fetch');}});
 assert.equal(reports.length,0);assert.equal(compared,false);assert.deepEqual(reports.skipped,[]);
});
