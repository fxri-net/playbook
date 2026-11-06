// 版本同步：changelog version 只改 package.json，这里把版本回写到技能清单
// 只替换清单首个 version 字段（顶层版本），不重排缩进与内联数组，避免顺带改动格式
import { readFileSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const manifestFile = join(root, "skills.json")
const version = JSON.parse(readFileSync(join(root, "package.json"), "utf8")).version
const text = readFileSync(manifestFile, "utf8")
// 文件内首个 "version" 即清单顶层版本，技能条目版本在 skills 数组内
const pattern = /("version":\s*")([^"]*)(")/
const matched = pattern.exec(text)

if (!matched) {
  console.error("未找到清单版本字段，跳过版本同步")
  process.exit(1)
}
if (matched[2] === version) {
  console.log(`版本一致：skills.json 已是 ${version}`)
} else {
  writeFileSync(manifestFile, text.replace(pattern, `$1${version}$3`), "utf8")
  console.log(`已同步 skills.json 版本：${matched[2]} → ${version}`)
}
