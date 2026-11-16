import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import {validateContent,coverageKeys} from './check-content.mjs';
const article=readFileSync('src/content/lessons/uploads-and-input.mdx','utf8');
const source=article.match(/```js\n([\s\S]*?)```/)[1];
function run(){const lines=[];const c={console:{log:(...a)=>lines.push(a.join(' '))}};vm.runInNewContext(source,c,{timeout:1000});return {lines,c};}
test('prefix-only fictitious data is not reported as a validated or safe image',()=>assert.deepEqual(run().lines,['先頭8バイトのみ一致。解析は未確認','先頭形式が違う']));
test('upload observation rejects wrong sizes, values and prefixes without processing any real image',()=>{
 const {c}=run();assert.equal(c.headerStage([137,80]),'先頭形式が違う');assert.equal(c.headerStage([256]),'バイト列を確認できない');assert.equal(c.headerStage('DEMO'),'バイト列を確認できない');assert.throws(()=>c.headerStage([],0),/上限の設定/);assert.equal(c.headerStage([137,80,78,71,13,10,26,10,0],8),'サイズ上限を超える');
});
test('upload lesson retains coverage and requires diagrams, worked code and observable result',()=>{
 assert.deepEqual(validateContent('uploads-and-input',article).errors,[]);
 for(const key of coverageKeys)assert(validateContent('future',article.replace(new RegExp(`^  ${key}: .+\\n`,'m'),'')).errors.length,key);
 for(const bad of [article.replace(/<UploadVisual\b[^>]*\/>/g,''),article.replace(/```js\n[\s\S]*?```/g,''),article.replace(/```text\n[\s\S]*?```/g,'')])assert(validateContent('future',bad).errors.length);
});
