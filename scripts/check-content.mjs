import { readdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";
// Migration baseline: pre-policy lessons are reported, never silently counted as compliant.
export const legacyLessons = new Set([
  "basics",
  "node-october-2026",
  "commands",
  "checklist",
  "operations",
]);
export const requiredSections = [
  "対象と前提",
  "仕組みをつかむ",
  "想定リスク",
  "過去の事例から学ぶ",
  "誰が何を確認するか",
  "一つ確かめてみる",
  "確認チェックリスト",
  "次の行動",
  "一次資料",
];
export function validateContent(id, text) {
  const errors = [];
  const [front, body] = text.replace(/^---\s*\n/, "").split(/\n---\s*\n/, 2);
  if (legacyLessons.has(id) && !/^qualityVersion: 1$/m.test(front ?? ""))
    return { id, status: "legacy-review", errors: [] };
  if (!/^qualityVersion: 1$/m.test(front ?? ""))
    errors.push("qualityVersion: 1 is required");
  const sections = Object.fromEntries(
    [
      ...(body ?? "").matchAll(/^## (.+)\n([\s\S]*?)(?=^## |$(?![\s\S]))/gm),
    ].map((m) => [m[1], m[2]]),
  );
  for (const heading of requiredSections)
    if (!sections[heading]?.trim()) errors.push(`Missing section: ${heading}`);
  const history = sections["過去の事例から学ぶ"] ?? "";
  if (
    !/\*\*分類：(事故の公表|脆弱性の公表|再現実験|確認できる事例なし)。\*\*/.test(
      history,
    )
  )
    errors.push("Case classification is required");
  if (
    !history.includes("確認できる事例なし") &&
    (!/https:\/\//.test(history) || !/[12]\d{3}/.test(history))
  )
    errors.push("Case needs dated evidence");
  const roles = sections["誰が何を確認するか"] ?? "";
  if ((roles.match(/^\|/gm) ?? []).length < 4)
    errors.push("Role-specific verification table is required");
  const checklist = sections["確認チェックリスト"] ?? "";
  if ((checklist.match(/^- \*\*.+?：\*\*/gm) ?? []).length < 3)
    errors.push("Checklist needs at least three concrete evidence points");
  if (!/https:\/\//.test(sections["一次資料"] ?? ""))
    errors.push("Primary references are required");
  if (!/<Flow\b/.test(body ?? ""))
    errors.push("Explain the mechanism with a diagram");
  return {
    id,
    status: errors.length ? "failed" : "structured-review-required",
    errors,
  };
}
if (
  process.argv[1] &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  const reports = readdirSync("src/content/lessons")
    .filter((f) => f.endsWith(".mdx"))
    .map((f) =>
      validateContent(
        f.slice(0, -4),
        readFileSync(`src/content/lessons/${f}`, "utf8"),
      ),
    );
  const failed = reports.filter((r) => r.errors.length);
  for (const r of failed) console.error(r.id, r.errors.join("; "));
  console.log(
    `Content structure: ${reports.filter((r) => r.status === "structured-review-required").length} checked; ${reports.filter((r) => r.status === "legacy-review").length} pre-policy lessons pending review. Facts and adequacy require editorial review.`,
  );
  process.exitCode = failed.length ? 1 : 0;
}
