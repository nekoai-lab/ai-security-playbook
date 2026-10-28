import{test}from'node:test';import assert from'node:assert/strict';import{readFile,readdir,access}from'node:fs/promises';import{updateSchema}from'../src/data/security-update-schema';
const files=(await readdir('src/data/security-updates')).filter(f=>f.endsWith('.json'));
test('published updates have valid data, factual date fields, sources, related lessons and first-position fixes',async()=>{assert(files.length);for(const f of files){const u=updateSchema.parse(JSON.parse(await readFile('src/data/security-updates/'+f,'utf8')));assert.equal(f,u.id+'.json');for(const id of u.related)await access(`src/content/lessons/${id}.mdx`);await access(`public/images/${u.image}-480.webp`);const html=await readFile(`dist/updates/${u.id}/index.html`,'utf8');assert(html.indexOf('id="fixes-title"')<html.indexOf('id="scope-title"'));for(const fix of u.fixes)assert(html.includes(fix.detail));for(const source of u.sources)assert(html.includes(source.url));assert(!html.includes('ai-business-architecture-playbook'));}});
test('missing sources, arbitrary image, executable fields and inconsistent dates fail closed',async()=>{const u=JSON.parse(await readFile('src/data/security-updates/'+files[0],'utf8'));for(const invalid of[{...u,sources:[]},{...u,image:'unapproved'},{...u,script:'alert(1)'},{...u,published:'2026-11-01',updated:'2026-10-26'},{...u,sources:[{title:'x',url:'http://example.com'}]}])assert(!updateSchema.safeParse(invalid).success);});

test('nested fields cannot bypass secret detection',async()=>{
 const original=JSON.parse(await readFile('src/data/security-updates/'+files[0],'utf8'));
 for(const [field,key]of [['fixes','detail'],['actions','detail'],['sources','title']])for(const secret of ['ghp_'+'x'.repeat(24),'BEGIN RSA PRIVATE KEY']){
  const u=structuredClone(original);u[field][0][key]=secret;assert(!updateSchema.safeParse(u).success,`${field}.${key}`);
 }
});

test('updates and lessons share the article frame and both table-of-contents modes',async()=>{for(const route of ['updates/python-2026-10','learn/ai-review-trust']){const html=await readFile(`dist/${route}/index.html`,'utf8');for(const marker of ['wrap article-wrap','article-header','article-grid','article-toc-optional','article-mobile-toc'])assert(html.includes(marker),`${route}: ${marker}`);}});

test('approved update variant exposes dates and retains accessible table semantics',async()=>{
 const html=await readFile('dist/updates/python-2026-10/index.html','utf8');
 for(const value of ['article-wrap--update','update-date-detail','最終更新','role="table"','role="rowheader"','role="cell"'])assert(html.includes(value),value);
 const lesson=await readFile('dist/learn/ai-review-trust/index.html','utf8');assert(!lesson.includes('article-wrap--update'));
});


test('Tailworm distinguishes reported findings, read-only checking and unrelated fixes',async()=>{
 const html=await readFile('dist/updates/tailworm-2026-10/index.html','utf8');
 for(const text of ['何が報告された？','通常のSSH','RunSSH','tailscale debug prefs','TS_SSH_DISABLE_FORWARDING=1','TS-2026-013','公開済みとは限りません','https://tailscale.com/ssh-investigation-update'])assert(html.includes(text),text);
 assert(!html.includes('tailscale set --ssh'));
});


test('Warp guide separates unverified incident news from official product controls',async()=>{
const h=await readFile('dist/updates/warp-logs-2026-10/index.html','utf8');
for(const text of ['一次発表を直接取得できず','三つの話','Help improve Warp','Session Sharing','今回の侵入経路の図ではありません','https://docs.warp.dev/support-and-community/privacy-and-security/privacy/'])assert(h.includes(text),text);
assert(!h.includes('naomi'));assert(!h.includes('1,700'));
});
