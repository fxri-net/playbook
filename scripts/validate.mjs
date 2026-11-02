// 结构校验：manifest / 命名 / 体积 / scope & triggers / references / 敏感信息 / catalog 一致性
// 不与生成脚本复刻逻辑：catalog 期望值直接调用 gen-catalog 的 buildCatalog / buildSidebar
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs"
import { dirname, join, relative, resolve, sep } from "node:path"
import { fileURLToPath } from "node:url"
import { buildCatalog, buildDocsCatalog, buildSidebar, buildSkillPages, loadManifest } from "./gen-catalog.mjs"

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const errors = []
const fail = (file, message) => errors.push(`${file}: ${message}`)

const REQUIRED_FILES = ["package.json", "README.md", "LICENSE", "NOTICE", "TRADEMARK.md", "SECURITY.md", "CONTRIBUTING.md", "skills.json", "categories.json"]
const ALLOWED_TYPES = new Set(["bundle", "template", "profile", "preset", "guide"])
const TYPE_BUDGET = { bundle: 800, template: 3000 }
const DEFAULT_BUDGET = 8000
const SEMVER = /^\d+\.\d+\.\d+$/
const KEBAB = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

// 仓库相对路径统一为正斜杠，便于跨平台比对
const rel = (p) => relative(root, p).split(sep).join("/")

// 读取 frontmatter 块（不含分隔线）
function frontmatterOf(content) {
  const matched = content.replace(/^\uFEFF/, "").match(/^---\r?\n([\s\S]*?)\r?\n---/)
  return matched ? (matched[1] ?? "") : ""
}

// 顶层字段
function field(block, key) {
  const matched = block.match(new RegExp(`^${key}:[ \\t]*(.*)$`, "m"))
  return matched ? (matched[1] ?? "").trim() : ""
}

// metadata 下的缩进字段
function metaField(block, key) {
  const matched = block.match(new RegExp(`^[ \\t]+${key}:[ \\t]*(.*)$`, "m"))
  return matched ? (matched[1] ?? "").trim() : ""
}

// 行内数组：支持 [a, b] 与单值
function inlineArray(value) {
  if (!value) return []
  const inner = value.startsWith("[") && value.endsWith("]") ? value.slice(1, -1) : value
  return inner
    .split(",")
    .map((item) => item.trim().replace(/^["']|["']$/g, ""))
    .filter(Boolean)
}

// 敏感信息模式：密钥、内网地址、本机绝对路径、私钥
const SENSITIVE = [
  { re: /(?:sk-|ghp_|AKIA)[A-Za-z0-9_-]{8,}/, label: "疑似密钥" },
  { re: /\b(?:10|192\.168|172\.(?:1[6-9]|2\d|3[01]))\.\d{1,3}\.\d{1,3}\b/, label: "内网地址" },
  { re: /(?:[A-Za-z]:\\Users\\|\/Users\/)/, label: "本机用户目录" },
  { re: /file:\/\/\//, label: "本机绝对链接" },
  { re: /-----BEGIN [A-Z ]*PRIVATE KEY-----/, label: "私钥" },
]

// 校验文件存在
for (const file of REQUIRED_FILES) {
  if (!existsSync(join(root, file))) fail(file, "缺少必需文件")
}

// 校验 manifest 与分类
let manifest
let categories
try {
  ;({ manifest, categories } = loadManifest(root))
} catch (e) {
  fail("skills.json", `读取失败：${e.message}`)
}

if (manifest) {
  if (manifest.formatVersion !== 1) fail("skills.json", `formatVersion 须为 1（实际：${manifest.formatVersion}）`)
  if (typeof manifest.name !== "string" || manifest.name.trim() === "") fail("skills.json", "name 须为非空字符串")
  if (!SEMVER.test(String(manifest.version))) fail("skills.json", `version 非法：${manifest.version}`)
  if (!Array.isArray(manifest.skills) || manifest.skills.length === 0) fail("skills.json", "skills 须为非空数组")
}

const categoryIds = new Set((categories?.categories ?? []).map((category) => category.id))
if (categoryIds.size === 0) fail("categories.json", "categories 须为非空数组")
if (categoryIds.size !== (categories?.categories ?? []).length) fail("categories.json", "分类 id 重复")
for (const category of categories?.categories ?? []) {
  if (typeof category.id !== "string" || !KEBAB.test(category.id)) fail("categories.json", `分类 id 非法：${category.id}`)
  if (typeof category.label !== "string" || category.label.trim() === "") fail("categories.json", `分类 ${category.id} 缺少 label`)
  if (typeof category.description !== "string" || category.description.trim() === "") fail("categories.json", `分类 ${category.id} 缺少 description`)
  if (category.status !== "active" && category.status !== "reserved") fail("categories.json", `分类 ${category.id} 的 status 须为 active / reserved`)
}

const skills = manifest?.skills ?? []
const skillNames = new Set()
const manifestsByName = new Map()

for (const skill of skills) {
  const label = `skills.json#${skill.name ?? "(未命名)"}`
  if (typeof skill.name !== "string" || !KEBAB.test(skill.name) || skill.name.length > 64) {
    fail(label, "name 须为 kebab-case 且 ≤64 字符")
    continue
  }
  if (skillNames.has(skill.name)) fail(label, "技能名重复")
  skillNames.add(skill.name)
  manifestsByName.set(skill.name, skill)
  if (skill.path !== `skills/${skill.name}`) fail(label, `path 须为 skills/${skill.name}`)
  if (!categoryIds.has(skill.category)) fail(label, `category 未在 categories.json 登记：${skill.category}`)
  if (!ALLOWED_TYPES.has(skill.type)) fail(label, `type 非法：${skill.type}`)
  if (!SEMVER.test(String(skill.version))) fail(label, `version 非法：${skill.version}`)
  if (typeof skill.title !== "string" || skill.title.trim() === "") fail(label, "title 须为非空字符串")
  if (typeof skill.summary !== "string" || skill.summary.trim() === "") fail(label, "summary 须为非空字符串")
  if (!Array.isArray(skill.requires)) fail(label, "requires 须为数组")

  const skillDir = join(root, "skills", skill.name)
  const skillFile = join(skillDir, "SKILL.md")
  if (!existsSync(skillDir) || !statSync(skillDir).isDirectory()) {
    fail(label, `目录不存在：${skill.path}`)
    continue
  }
  if (!existsSync(skillFile)) {
    fail(label, "缺少 SKILL.md")
    continue
  }
  const content = readFileSync(skillFile, "utf8")
  const fm = frontmatterOf(content)
  if (!fm) {
    fail(label, "缺少 frontmatter")
    continue
  }
  if (field(fm, "name") !== skill.name) fail(label, `frontmatter name 与技能名不一致：${field(fm, "name")}`)
  const description = field(fm, "description")
  if (description.length === 0 || description.length > 1024) fail(label, `description 长度须在 1–1024（实际：${description.length}）`)
  const version = metaField(fm, "version").replace(/^"|"$/g, "")
  if (version !== skill.version) fail(label, `frontmatter version 与 manifest 不一致：${version} / ${skill.version}`)
  const bodyVersion = content.match(/^>[ \t]*本技能版本[ \t]*([^ \t（(]+)/m)?.[1] ?? ""
  if (bodyVersion !== version) fail(label, `正文版本与 frontmatter 不一致：${bodyVersion || "未声明"} / ${version}`)
  const tier = metaField(fm, "tier")
  if (tier !== "core" && tier !== "optional") fail(label, `tier 须为 core / optional（实际：${tier || "未声明"}）`)
  if (inlineArray(metaField(fm, "scope")).length === 0) fail(label, "scope 须为非空数组")
  if (inlineArray(metaField(fm, "triggers")).length === 0) fail(label, "triggers 须为非空数组")
  if (metaField(fm, "category") !== skill.category) fail(label, "frontmatter category 与 manifest 不一致")
  if (metaField(fm, "type") !== skill.type) fail(label, "frontmatter type 与 manifest 不一致")
  const requires = inlineArray(metaField(fm, "requires"))
  if (JSON.stringify(requires) !== JSON.stringify(skill.requires)) fail(label, "frontmatter requires 与 manifest 不一致")

  const lines = content.split(/\r?\n/).length
  if (lines >= 200) fail(label, `SKILL.md 行数 ${lines} 超过上限 200`)
  const budget = TYPE_BUDGET[skill.type] ?? DEFAULT_BUDGET
  if (content.length > budget) fail(label, `SKILL.md 体积 ${content.length} 超过 ${skill.type} 预算 ${budget}`)

  // 相对链接可达性
  for (const matched of content.matchAll(/\]\(([^)]+)\)/g)) {
    const target = matched[1].split("#")[0]
    if (!target || /^[a-z][a-z0-9+.-]*:/i.test(target) || target.startsWith("/")) continue
    const resolved = resolve(dirname(skillFile), target)
    if (!resolved.startsWith(root)) fail(label, `链接越出仓库：${target}`)
    else if (!existsSync(resolved)) fail(label, `链接目标不存在：${target}`)
  }

  // 敏感信息扫描
  for (const pattern of SENSITIVE) {
    if (pattern.re.test(content)) fail(label, `疑似包含${pattern.label}`)
  }
}

// manifest 与磁盘技能目录双向一致
const diskSkills = existsSync(join(root, "skills"))
  ? readdirSync(join(root, "skills"), { withFileTypes: true }).filter((entry) => entry.isDirectory()).map((entry) => entry.name)
  : []
for (const name of diskSkills) {
  if (!skillNames.has(name)) fail(`skills/${name}`, "目录未在 skills.json 登记")
}
for (const name of skillNames) {
  if (!diskSkills.includes(name)) fail(`skills.json#${name}`, "登记的技能目录不存在")
}

// requires 存在性与循环检测
const visiting = new Set()
const visited = new Set()
function visit(name, trail = []) {
  if (visiting.has(name)) {
    fail(`skills.json#${name}`, `requires 存在循环：${[...trail, name].join(" → ")}`)
    return
  }
  if (visited.has(name)) return
  visiting.add(name)
  for (const dep of manifestsByName.get(name)?.requires ?? []) {
    if (!skillNames.has(dep)) fail(`skills.json#${name}`, `requires 指向不存在的技能：${dep}`)
    else visit(dep, [...trail, name])
  }
  visiting.delete(name)
  visited.add(name)
}
for (const name of skillNames) visit(name)

// catalog 与 sidebar 一致性
if (manifest && categories) {
  const expectedCatalog = buildCatalog(manifest, categories)
  const expectedDocsCatalog = buildDocsCatalog(manifest, categories)
  const expectedSidebar = `${JSON.stringify(buildSidebar(manifest, categories), null, 2)}\n`
  const catalogFile = join(root, "catalog.md")
  const docsCatalogFile = join(root, "docs", "catalog.md")
  const sidebarFile = join(root, "docs", "sidebar.json")
  if (!existsSync(catalogFile) || readFileSync(catalogFile, "utf8") !== expectedCatalog) fail("catalog.md", "与 manifest 不一致，请运行 node scripts/gen-catalog.mjs")
  if (!existsSync(docsCatalogFile) || readFileSync(docsCatalogFile, "utf8") !== expectedDocsCatalog) fail("docs/catalog.md", "与 manifest 不一致，请运行 node scripts/gen-catalog.mjs")
  if (!existsSync(sidebarFile) || readFileSync(sidebarFile, "utf8") !== expectedSidebar) fail("docs/sidebar.json", "与 manifest 不一致，请运行 node scripts/gen-catalog.mjs")
  for (const [name, content] of buildSkillPages(manifest, root)) {
    const file = join(root, "docs", "skills", `${name}.md`)
    if (!existsSync(file) || readFileSync(file, "utf8") !== content) fail(`docs/skills/${name}.md`, "与 SKILL.md 不一致，请运行 node scripts/gen-catalog.mjs")
  }
}

// 规范载体：v3 标记、C-1 / C-2 条目与演进记录
const conventionsIndex = join(root, ".tasks", "conventions", "index.md")
if (!existsSync(conventionsIndex)) {
  fail(".tasks/conventions/index.md", "缺少规范载体索引")
} else {
  const index = readFileSync(conventionsIndex, "utf8")
  if (!index.includes("<!-- toolkit-conventions: v3 -->")) fail(".tasks/conventions/index.md", "缺少 v3 形态标记")
  for (const id of ["C-1", "C-2"]) {
    if (!index.includes(`| ${id} |`)) fail(".tasks/conventions/index.md", `缺少规范 ${id}`)
  }
  const common = join(root, ".tasks", "conventions", "common.md")
  if (!existsSync(common)) fail(".tasks/conventions/common.md", "缺少 common 分册")
  const history = join(root, ".tasks", "conventions", "history.md")
  if (!existsSync(history)) fail(".tasks/conventions/history.md", "缺少演进记录")
  else {
    const historyText = readFileSync(history, "utf8")
    for (const id of ["C-1", "C-2"]) if (!historyText.includes(`| ${id} |`)) fail(".tasks/conventions/history.md", `缺少 ${id} 的演进记录`)
  }
}

// 公开文本敏感扫描：README、CONTRIBUTING 与 catalog
for (const file of ["README.md", "CONTRIBUTING.md", "catalog.md"]) {
  if (!existsSync(join(root, file))) continue
  const content = readFileSync(join(root, file), "utf8")
  for (const pattern of SENSITIVE) if (pattern.re.test(content)) fail(file, `疑似包含${pattern.label}`)
}

if (errors.length > 0) {
  console.error(`校验失败：${errors.length} 项`)
  for (const error of errors) console.error(`  - ${error}`)
  process.exit(1)
}
console.log(`校验通过：${skillNames.size} 个技能，${categoryIds.size} 个分类`)
