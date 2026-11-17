import { updateSchema } from "./security-update-schema";
const entries = import.meta.glob("./security-updates/*.json", { eager:true, import:"default" });
export const securityUpdates = Object.entries(entries).map(([file,data])=>{
 const entry=updateSchema.parse(data);
 if(!file.endsWith(`/${entry.id}.json`))throw Error(`Update filename mismatch: ${file}`);
 return entry;
}).sort((a,b)=>b.updated.localeCompare(a.updated)||a.id.localeCompare(b.id));
