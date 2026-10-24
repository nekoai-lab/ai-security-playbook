import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import {validateContent,coverageKeys} from './check-content.mjs';
const article=readFileSync('src/content/lessons/cloud-account-safety.mdx','utf8');
const source=article.match(/```js\n([\s\S]*?)```/)[1];
function run(){const lines=[];const c={console:{log:(...a)=>lines.push(a.join(' '))}};vm.runInNewContext(source,c,{timeout:1000});return {lines,c};}
test('identity example provides next checks instead of declaring broad permissions safe',()=>assert.deepEqual(run().lines,['所有者の入口。日常操作の認証を分ける','ロールのセッション。信頼先と権限を確認']));
test('missing, unsupported, mismatched and incomplete identities do not become verified role sessions',()=>{
 const {c}=run();assert.equal(c.nextCheck({}),'主体を確認できない');
 for(const Arn of ['arn:aws:iam::123456789012:user/demo','arn:aws:sts::999999999999:assumed-role/Demo/session','arn:aws:sts::123456789012:assumed-role/OnlyName','UNKNOWN'])assert.equal(c.nextCheck({Account:'123456789012',Arn}),'主体の種類と設定を確認');
});
test('cloud lesson keeps coverage and requires mechanism figure, code and observed result',()=>{
 assert.deepEqual(validateContent('cloud-account-safety',article).errors,[]);
 for(const key of coverageKeys)assert(validateContent('future',article.replace(new RegExp(`^  ${key}: .+\\n`,'m'),'')).errors.length,key);
 for(const bad of [article.replace(/<CloudAccountVisual\b[^>]*\/>/g,''),article.replace(/```(?:js|sh)\n[\s\S]*?```/g,''),article.replace(/```text\n[\s\S]*?```/g,'')])assert(validateContent('future',bad).errors.length);
});
