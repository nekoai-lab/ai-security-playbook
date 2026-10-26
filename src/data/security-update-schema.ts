import { z } from "astro/zod";
const date = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);
const text = z.string().trim().min(1);
export const updateSchema = z.object({
 id: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/), title:text, summary:text,
 product:text, announced:date, published:date, updated:date, reviewed:date,
 image:z.enum(["maintenance-lookout","dependency-update-scene","runtime-field-guide"]),
 fixes:z.array(z.object({area:text,detail:text,versions:text})).min(1).max(8),
 scope:text, limitations:text, checker:z.enum(["python","none"]),
 actions:z.array(z.object({title:text,detail:text})).min(1).max(4),
 sources:z.array(z.object({title:text,url:z.url().startsWith("https://")})).min(1),
 related:z.array(z.string().regex(/^[a-z0-9-]+$/)).min(1),
}).strict().superRefine((d,c)=>{
 const inspect=(value:unknown,path:string)=>{
   if(typeof value === "string" && /<script|google-site-verification|BEGIN .*PRIVATE KEY|gh[pousr]_[A-Za-z0-9]{20}/i.test(value))c.addIssue({code:"custom",message:`Unsafe content: ${path}`});
   else if(Array.isArray(value))value.forEach((item,i)=>inspect(item,`${path}[${i}]`));
   else if(value && typeof value === "object")Object.entries(value).forEach(([key,item])=>inspect(item,`${path}.${key}`));
 };
 inspect(d,"update");
 if(d.published>d.updated||d.reviewed>d.updated)c.addIssue({code:"custom",message:"Inconsistent content dates"});
});
export type SecurityUpdate = z.infer<typeof updateSchema>;
