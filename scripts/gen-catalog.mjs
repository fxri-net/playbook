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

// 生成文档站目录页：与根 catalog 共用同一份正文，避免两处维护
export function buildDocsCatalog(manifest, categories) {
  return `---\ntitle: 技能目录\n---\n\n${buildCatalog(manifest, categories)}`
}

// 仓库地址：技能页里把相对 references 链接改写为 GitHub 原文地址，避免文档站死链
const REPO_URL = "https://github.com/fxri-net/playbook"

// 去掉 SKILL.md 的 frontmatter，只留正文
function stripFrontmatter(content) {
  return content.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, "")
}

// 生成单个技能页：标题与元信息取 manifest，正文取 SKILL.md，相对链接改写为仓库地址
export function buildSkillPage(skill, content) {
  const body = stripFrontmatter(content).replace(/\]\(([^)]+)\)/g, (matched, target) => {
    if (/^[a-z][a-z0-9+.-]*:/i.test(target) || target.startsWith("#") || target.startsWith("/")) return matched
    return `](${REPO_URL}/blob/main/skills/${skill.name}/${target})`
  })
  return `---\ntitle: ${skill.title}\n---\n\n# ${skill.title}\n\n> 技能：\`${skill.name}\`　类型：${skill.type}　版本：${skill.version}\n\n${body.trim()}\n`
}

// 生成全部技能页：name → 页面全文
export function buildSkillPages(manifest, rootDir = root) {
  return manifest.skills.map((skill) => [skill.name, buildSkillPage(skill, readFileSync(join(rootDir, "skills", skill.name, "SKILL.md"), "utf8"))])
}

// 写生成物：根目录页、文档站目录页、技能页与侧边栏
export function writeCatalog(rootDir = root) {
  const { manifest, categories } = loadManifest(rootDir)
  const catalog = buildCatalog(manifest, categories)
  const sidebar = buildSidebar(manifest, categories)
  writeFileSync(join(rootDir, "catalog.md"), catalog, "utf8")
  const docsDir = join(rootDir, "docs")
  const skillsDir = join(docsDir, "skills")
  if (!existsSync(skillsDir)) mkdirSync(skillsDir, { recursive: true })
  writeFileSync(join(docsDir, "catalog.md"), buildDocsCatalog(manifest, categories), "utf8")
  for (const [name, content] of buildSkillPages(manifest, rootDir)) writeFileSync(join(skillsDir, `${name}.md`), content, "utf8")
  writeFileSync(join(docsDir, "sidebar.json"), `${JSON.stringify(sidebar, null, 2)}\n`, "utf8")
  return { catalog, sidebar }
}

// 直接执行：默认写入；--check 只比对不写
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const check = process.argv.includes("--check")
  const { manifest, categories } = loadManifest()
  const expectedCatalog = buildCatalog(manifest, categories)
  const expectedDocsCatalog = buildDocsCatalog(manifest, categories)
  const expectedSidebar = `${JSON.stringify(buildSidebar(manifest, categories), null, 2)}\n`
  const catalogFile = join(root, "catalog.md")
  const docsCatalogFile = join(root, "docs", "catalog.md")
  const sidebarFile = join(root, "docs", "sidebar.json")
  if (!check) {
    writeCatalog()
    console.log("已生成 catalog.md、docs/catalog.md、技能页与 docs/sidebar.json")
  } else {
    const actualCatalog = existsSync(catalogFile) ? readFileSync(catalogFile, "utf8") : ""
    const actualDocsCatalog = existsSync(docsCatalogFile) ? readFileSync(docsCatalogFile, "utf8") : ""
    const actualSidebar = existsSync(sidebarFile) ? readFileSync(sidebarFile, "utf8") : ""
    const pages = buildSkillPages(manifest)
    const pagesStale = pages.filter(([name, content]) => {
      const file = join(root, "docs", "skills", `${name}.md`)
      return !existsSync(file) || readFileSync(file, "utf8") !== content
    })
    if (actualCatalog !== expectedCatalog || actualDocsCatalog !== expectedDocsCatalog || actualSidebar !== expectedSidebar || pagesStale.length > 0) {
      console.error("catalog 生成物与 manifest 不一致，请运行 node scripts/gen-catalog.mjs")
      process.exit(1)
    }
    console.log("catalog 生成物一致")
  }
}
