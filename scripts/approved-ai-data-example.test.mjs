import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import {validateContent,coverageKeys} from './check-content.mjs';
const article=readFileSync('src/content/lessons/approved-ai-data.mdx','utf8');
const source=article.match(/```js\n([\s\S]*?)```/)[1];
function run(extra=''){const lines=[];const c={console:{log:(...a)=>lines.push(a.join(' '))}};vm.runInNewContext(source+'\n'+extra,c,{timeout:1000});return {lines,c};}
test('task selection preserves necessary fictitious delivery fields and omits unrelated data',()=>assert.deepEqual(run().lines,['分類: {"caseId":"DEMO-014","body":"配送日の相談"}','照合: {"caseId":"DEMO-014","recipient":"架空の受取人","address":"架空の配送先"}']));
test('unknown tasks and missing fields stop instead of falling back to full records',()=>{
 const {c}=run();for(const task of ['未登録','toString','__proto__'])assert.throws(()=>c.selectFields(task,{}),/用途が未登録/);
 assert.throws(()=>c.selectFields('配送先照合',{caseId:'DEMO'}),/必要な項目が不足/);
 const out=c.selectFields('問い合わせ分類',{caseId:'DEMO',body:'架空の住所が本文にある',internalNote:'不要'});assert.equal(out.body,'架空の住所が本文にある');assert(!('internalNote' in out));
});
test('approved data lesson retains coverage and mandatory diagrams, code and observed result',()=>{
 assert.deepEqual(validateContent('approved-ai-data',article).errors,[]);
 for(const key of coverageKeys)assert(validateContent('future',article.replace(new RegExp(`^  ${key}: .+\\n`,'m'),'')).errors.length,key);
 for(const bad of [article.replace(/<EnterpriseVisual\b[^>]*\/>/g,''),article.replace(/```js\n[\s\S]*?```/g,''),article.replace(/```text\n[\s\S]*?```/g,'')])assert(validateContent('future',bad).errors.length);
});
