import { readdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";
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
export const coverageKeys = [
  "audience",
  "mechanism",
  "risks",
  "case",
  "roles",
  "exercise",
  "checklist",
  "next",
  "sources",
];
export function validateContent(id, text) {
  const errors = [];
  const [front, body = ""] = text
    .replace(/^---\s*\n/, "")
    .split(/\n---\s*\n/, 2);
  const version = /^qualityVersion: ([12])$/m.exec(front ?? "")?.[1];
  if (legacyLessons.has(id) && !version)
    return { id, status: "legacy-review", errors: [] };
  if (!version) errors.push("qualityVersion: 1 or 2 is required");
  const sections = Object.fromEntries(
    [...body.matchAll(/^## (.+)\n([\s\S]*?)(?=^## |$(?![\s\S]))/gm)].map(
      (m) => [m[1], m[2]],
    ),
  );
  let history, roles, checklist, sources;
  if (version === "2") {
    const mapBlock =
      /^reviewSections:\n((?:  [^\n]+\n)+)/m.exec(`${front}\n`)?.[1] ?? "";
    const map = Object.fromEntries(
      [...mapBlock.matchAll(/^  (\w+): "([^"]+)"$/gm)].map((m) => [m[1], m[2]]),
    );
    const intro = body
      .split(/^## /m)[0]
      .replace(/^import .*;\s*$/gm, "")
      .trim();
    const content = {};
    for (const key of coverageKeys) {
      const heading = map[key];
      content[key] =
        heading === "導入" && key === "audience"
          ? intro
          : (sections[heading] ?? "");
      if (!heading || !content[key].trim())
        errors.push(`Missing narrative coverage: ${key}`);
    }
    if (
      !/<(?:ArticleVisual|PracticeVisual|FoundationVisual|ServiceFailureVisual|UpdateVisual|GuardVisual|RotationVisual|LessonDiagram)\b/.test(
        content.mechanism ?? "",
      )
    )
      errors.push("Mechanism section needs an explanatory figure");
    if (
      !/```(?:js|javascript|ts|typescript|sh|bash|python)\b/.test(
        content.exercise ?? "",
      ) ||
      !/```text\b/.test(content.exercise ?? "")
    )
      errors.push("Worked example needs code and an observable result");
    if ((content.roles?.match(/^### /gm) ?? []).length < 3)
      errors.push(
        "Role-specific verification needs distinct inspection points",
      );
    history = content.case;
    roles = content.roles;
    checklist = content.checklist;
    sources = content.sources;
  } else {
    for (const heading of requiredSections)
      if (!sections[heading]?.trim())
        errors.push(`Missing section: ${heading}`);
    history = sections["過去の事例から学ぶ"] ?? "";
    roles = sections["誰が何を確認するか"] ?? "";
    checklist = sections["確認チェックリスト"] ?? "";
    sources = sections["一次資料"] ?? "";
    if ((roles.match(/^\|/gm) ?? []).length < 4)
      errors.push("Role-specific verification table is required");
    if (!/<(?:Flow|LessonDiagram)\b/.test(sections["仕組みをつかむ"] ?? ""))
      errors.push("Explain the mechanism with a diagram");
  }
  if (
    !/\*\*分類：(事故の公表|脆弱性の公表|再現実験|確認できる事例なし)。\*\*/.test(
      history ?? "",
    )
  )
    errors.push("Case classification is required");
  if (
    !history?.includes("確認できる事例なし") &&
    (!/https:\/\//.test(history ?? "") || !/[12]\d{3}/.test(history ?? ""))
  )
    errors.push("Case needs dated evidence");
  if ((checklist?.match(/^- \*\*.+?：\*\*/gm) ?? []).length < 3)
    errors.push("Checklist needs at least three concrete evidence points");
  if (!/https:\/\//.test(sources ?? ""))
    errors.push("Primary references are required");
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
