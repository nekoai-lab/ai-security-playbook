import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import {validateContent,coverageKeys} from './check-content.mjs';
const article=readFileSync('src/content/lessons/developer-privacy.mdx','utf8');
const source=article.match(/```js\n([\s\S]*?)```/)[1];
function run(extra=''){const lines=[];const c={console:{log:(...a)=>lines.push(a.join(' '))}};vm.runInNewContext(source+'\n'+extra,c,{timeout:1000});return {lines,c};}
test('published dummy model separates file text, author metadata and future config',()=>assert.deepEqual(run().lines,['本文にメール: false','記録にメール: true','次の設定: NEXT_HANDLE','過去の記録: DEMO_HANDLE']));
test('changing future identity leaves the existing author record intact',()=>{
 const {c}=run('nextAuthor.email="changed@example.invalid"; globalThis.before=record.author.email; globalThis.future=nextAuthor.email; globalThis.body=record.file;');
 assert.equal(c.before,'demo@example.invalid');assert.equal(c.future,'changed@example.invalid');assert(!c.body.includes(c.before));
});
test('privacy lesson keeps coverage and rejects missing mechanism, code or result',()=>{
 assert.deepEqual(validateContent('developer-privacy',article).errors,[]);
 for(const key of coverageKeys)assert(validateContent('future',article.replace(new RegExp(`^  ${key}: .+\\n`,'m'),'')).errors.length,key);
 for(const bad of [article.replace(/<PrivacyVisual\b[^>]*\/>/g,''),article.replace(/```js\n[\s\S]*?```/g,''),article.replace(/```text\n[\s\S]*?```/g,'')])assert(validateContent('future',bad).errors.length);
});
