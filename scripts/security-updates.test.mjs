import{test}from'node:test';import assert from'node:assert/strict';import{readFile,readdir,access}from'node:fs/promises';import{updateSchema}from'../src/data/security-update-schema';
const files=(await readdir('src/data/security-updates')).filter(f=>f.endsWith('.json'));
test('published updates have valid data, factual date fields, sources, related lessons and first-position fixes',async()=>{assert(files.length);for(const f of files){const u=updateSchema.parse(JSON.parse(await readFile('src/data/security-updates/'+f,'utf8')));assert.equal(f,u.id+'.json');for(const id of u.related)await access(`src/content/lessons/${id}.mdx`);await access(`public/images/${u.image}-480.webp`);const html=await readFile(`dist/updates/${u.id}/index.html`,'utf8');assert(html.indexOf('主な修正は、ここ。')<html.indexOf('自分にも関係する？'));for(const fix of u.fixes)assert(html.includes(fix.detail));for(const source of u.sources)assert(html.includes(source.url));assert(!html.includes('ai-business-architecture-playbook'));}});
test('missing sources, arbitrary image, executable fields and inconsistent dates fail closed',async()=>{const u=JSON.parse(await readFile('src/data/security-updates/'+files[0],'utf8'));for(const invalid of[{...u,sources:[]},{...u,image:'unapproved'},{...u,script:'alert(1)'},{...u,published:'2026-11-01',updated:'2026-10-26'},{...u,sources:[{title:'x',url:'http://example.com'}]}])assert(!updateSchema.safeParse(invalid).success);});

test('nested fields cannot bypass secret detection',async()=>{
 const original=JSON.parse(await readFile('src/data/security-updates/'+files[0],'utf8'));
 for(const [field,key]of [['fixes','detail'],['actions','detail'],['sources','title']])for(const secret of ['ghp_'+'x'.repeat(24),'BEGIN RSA PRIVATE KEY']){
  const u=structuredClone(original);u[field][0][key]=secret;assert(!updateSchema.safeParse(u).success,`${field}.${key}`);
 }
});
