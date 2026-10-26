export function parseQa(comment){
 const markers=[...comment.body.matchAll(/<!-- request-qa: reviewer=(cursor|claude) implementer=codex sha=([a-f0-9]{40}) verdict=(pass|blocking) rounds=([12]) -->/g)];
 if(markers.length!==1)return null;const m=markers[0];return{reviewer:m[1],head:m[2],verdict:m[3]};
}
export function assertPublication(pr,proof){
 if(pr.state!=='OPEN'||pr.baseRefName!=='main')throw Error('Expected open PR targeting main');
 const allowed=p=>/^src\/data\/security-updates\/[a-z0-9-]+\.json$/.test(p)||p==='design/review-map.json'||p==='design/UX_REVIEW.md'||p==='design/SPEC_TRACE.md'||/^design\/audit\/\d{4}-\d{2}-\d{2}\/[a-zA-Z0-9_./-]+\.(json|md)$/.test(p);
 if(pr.files.length>=100)throw Error('Too many files');
 for(const f of pr.files)if(!allowed(f.path)||f.status==='removed')throw Error(`Outside automatic publication scope: ${f.path}`);
 if(!pr.files.some(f=>/^src\/data\/security-updates\//.test(f.path)))throw Error('No update data');
 if(!proof||proof.head!==pr.headRefOid||!Number.isSafeInteger(proof.commentId))throw Error('Fresh trusted harness proof required');
 if(!pr.labels.some(l=>l.name==='qa-pass'))throw Error('QA label required');
 const results=pr.comments.map(comment=>({comment,qa:parseQa(comment)})).filter(x=>x.qa?.head===pr.headRefOid).sort((a,b)=>a.comment.id-b.comment.id);
 const latest=results.at(-1);
 if(!latest||latest.comment.id!==proof.commentId||latest.qa.verdict!=='pass')throw Error('Latest exact-head QA is not the fresh passing review');
 const checks=pr.statusCheckRollup;if(!checks.length||!checks.some(c=>c.conclusion==='SUCCESS'||c.state==='SUCCESS'))throw Error('Successful CI required');
 for(const c of checks){if(c.__typename==='CheckRun'){if(c.status!=='COMPLETED'||!['SUCCESS','SKIPPED','NEUTRAL'].includes(c.conclusion))throw Error('CI not ready');}else if(c.state!=='SUCCESS')throw Error('External status not successful');}
 return pr.headRefOid;
}
