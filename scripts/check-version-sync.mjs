// 版本一致性门禁：package.json 与 skills.json 的版本必须相同
// 发版时 changelog version 只改 package.json，由 scripts/sync-version.mjs 回写技能清单
import { readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const versionOf = (file) => JSON.parse(readFileSync(join(root, file), "utf8")).version
const pkgVersion = versionOf("package.json")
const manifestVersion = versionOf("skills.json")

if (pkgVersion !== manifestVersion) {
  console.error(`版本不一致：package.json ${pkgVersion} / skills.json ${manifestVersion}`)
  console.error("执行 node scripts/sync-version.mjs 同步后重跑")
  process.exit(1)
}
console.log(`版本一致：${pkgVersion}`)
