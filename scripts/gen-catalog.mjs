// 从 skills.json 与 categories.json 生成技能目录与文档站侧边栏
// 生成逻辑集中在本文件，validate.mjs 直接复用 buildCatalog / buildSidebar，避免两处实现漂移
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

// 仓库根：脚本位于 <root>/scripts/
const root = dirname(dirname(fileURLToPath(import.meta.url)))

// 读取并解析 JSON：文件缺失或解析失败直接抛错
function readJson(file) {
  return JSON.parse(readFileSync(file, "utf8"))
}

// 读取 manifest 与分类表
export function loadManifest(rootDir = root) {
  const manifest = readJson(join(rootDir, "skills.json"))
  const categories = readJson(join(rootDir, "categories.json"))
  return { manifest, categories }
}

// 按分类顺序分组技能；未识别分类追加到末尾
function groupByCategory(manifest, categories) {
  const order = categories.categories.map((category) => category.id)
  const groups = new Map(order.map((id) => [id, []]))
  for (const skill of manifest.skills) {
    if (!groups.has(skill.category)) groups.set(skill.category, [])
    groups.get(skill.category).push(skill)
  }
  for (const skills of groups.values()) skills.sort((a, b) => a.name.localeCompare(b.name))
  return { order: [...groups.keys()], groups, labelOf: new Map(categories.categories.map((category) => [category.id, category.label])) }
}

// 生成 catalog.md 全文
export function buildCatalog(manifest, categories) {
  const { order, groups, labelOf } = groupByCategory(manifest, categories)
  const lines = [
    "# 技能目录",
    "",
    "> 由 `node scripts/gen-catalog.mjs` 从 `skills.json` 生成，请勿手改。",
    "",
  ]
  for (const id of order) {
    const skills = groups.get(id) ?? []
    if (skills.length === 0) continue
    lines.push(`## ${labelOf.get(id) ?? id}`, "", "| 技能 | 类型 | 说明 |", "| --- | --- | --- |")
    for (const skill of skills) lines.push(`| \`${skill.name}\` | ${skill.type} | ${skill.summary} |`)
    lines.push("")
  }
  return `${lines.join("\n").replace(/\n+$/, "")}\n`
}

// 生成 VitePress 侧边栏 JSON（按分类分组）
export function buildSidebar(manifest, categories) {
  const { order, groups, labelOf } = groupByCategory(manifest, categories)
  const sidebar = []
  for (const id of order) {
    const skills = groups.get(id) ?? []
    if (skills.length === 0) continue
    sidebar.push({
      text: labelOf.get(id) ?? id,
      collapsed: false,
      items: skills.map((skill) => ({ text: skill.title, link: `/skills/${skill.name}/` })),
    })
  }
  return sidebar
}

// 写生成物：目录页与侧边栏
export function writeCatalog(rootDir = root) {
  const { manifest, categories } = loadManifest(rootDir)
  const catalog = buildCatalog(manifest, categories)
  const sidebar = buildSidebar(manifest, categories)
  writeFileSync(join(rootDir, "catalog.md"), catalog, "utf8")
  const docsDir = join(rootDir, "docs")
  if (!existsSync(docsDir)) mkdirSync(docsDir, { recursive: true })
  writeFileSync(join(docsDir, "sidebar.json"), `${JSON.stringify(sidebar, null, 2)}\n`, "utf8")
  return { catalog, sidebar }
}

// 直接执行：默认写入；--check 只比对不写
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const check = process.argv.includes("--check")
  const { manifest, categories } = loadManifest()
  const expectedCatalog = buildCatalog(manifest, categories)
  const expectedSidebar = `${JSON.stringify(buildSidebar(manifest, categories), null, 2)}\n`
  const catalogFile = join(root, "catalog.md")
  const sidebarFile = join(root, "docs", "sidebar.json")
  if (!check) {
    writeCatalog()
    console.log("已生成 catalog.md 与 docs/sidebar.json")
  } else {
    const actualCatalog = existsSync(catalogFile) ? readFileSync(catalogFile, "utf8") : ""
    const actualSidebar = existsSync(sidebarFile) ? readFileSync(sidebarFile, "utf8") : ""
    if (actualCatalog !== expectedCatalog || actualSidebar !== expectedSidebar) {
      console.error("catalog 生成物与 manifest 不一致，请运行 node scripts/gen-catalog.mjs")
      process.exit(1)
    }
    console.log("catalog 生成物一致")
  }
}
