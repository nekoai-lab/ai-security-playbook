import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import {validateContent,coverageKeys} from './check-content.mjs';
const article=readFileSync('src/content/lessons/secret-rotation.mdx','utf8');
const source=article.match(/```js\n([\s\S]*?)```/)[1];
function run(extra=''){const lines=[];const c={console:{log:(...a)=>lines.push(a.join(' '))}};vm.runInNewContext(source+'\n'+extra,c,{timeout:1000});return {lines,c};}
test('saved version and new process do not replace an existing client',()=>assert.deepEqual(run().lines,['保存先: demo-B','起動済み: demo-A 拒否','新しく起動: demo-B 受理']));
test('provider validity and runtime copy are separate states',()=>{
 const {c}=run('acceptedVersions.add("demo-A"); globalThis.oldDuringOverlap=result(oldClient); acceptedVersions.clear(); globalThis.newAfterRevoke=result(newClient); globalThis.oldCopy=oldClient.version;');
 assert.equal(c.oldDuringOverlap,'受理');assert.equal(c.newAfterRevoke,'拒否');assert.equal(c.oldCopy,'demo-A');
});
test('rotation lesson retains coverage, mechanism diagrams and observable exercise',()=>{
 assert.deepEqual(validateContent('secret-rotation',article).errors,[]);
 for(const key of coverageKeys)assert(validateContent('future',article.replace(new RegExp(`^  ${key}: .+\\n`,'m'),'')).errors.length,key);
 for(const bad of [article.replace(/<RotationVisual\b[^>]*\/>/g,''),article.replace(/```js\n[\s\S]*?```/g,''),article.replace(/```text\n[\s\S]*?```/g,'')])assert(validateContent('future',bad).errors.length);
});
