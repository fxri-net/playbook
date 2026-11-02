// 聚合门禁：结构校验（含敏感扫描与 catalog 一致性）→ 文档站构建（含死链检查）
// 本地与 CI 共用本脚本，不在 CI 配置里另写步骤枚举
import { spawnSync } from "node:child_process"
import { dirname } from "node:path"
import { fileURLToPath } from "node:url"

// 仓库根：脚本位于 <root>/scripts/
const root = dirname(dirname(fileURLToPath(import.meta.url)))
const isWindows = process.platform === "win32"

// 步骤清单：顺序有依赖（校验先于构建），任一步失败即中止
const steps = [
  { label: "结构校验（含敏感扫描与 catalog 一致性）", command: process.execPath, args: ["scripts/validate.mjs"] },
  { label: "CHANGELOG 镜像一致（toolkit changelog doc --check）", command: process.execPath, args: ["scripts/check-changelog-doc.mjs"] },
  { label: "文档站构建（含死链检查）", command: "pnpm", args: ["docs:build"], shell: isWindows },
]

const failures = []
for (const step of steps) {
  console.log(`\n▶ ${step.label}`)
  const result = spawnSync(step.command, step.args, { cwd: root, stdio: "inherit", shell: Boolean(step.shell) })
  if (result.status !== 0) {
    failures.push(step.label)
    break
  }
}

if (failures.length > 0) {
  console.error(`\n✖ 门禁未通过：${failures.join("、")}`)
  process.exit(1)
}
console.log(`\n✔ 门禁全部通过（共 ${steps.length} 步）`)
