# AGENTS.md — 方弦实践集

> 规则更新时间 2026-11-11 17:25。本规则内容变更时以变更时刻更新此值；快照与本文件当前值不一致即说明已失同步。

适用于任何 AI 编码工具在本仓库内维护技能内容。本规则仅约束本仓库的开发过程，不适用于把本仓技能安装到用户项目后的使用过程。

## 能力变更三方真实一致（强制质量门）

任何影响对外行为的变更——新增 / 修改 / 删除技能、技能正文与 references、manifest 字段、文档站手写页、生成脚本——在任务归档前必须完成三方复核，与 `toolkit tasks check` 同为不可绕过的质量门：

1. **能力自身**：`skills.json` ↔ `SKILL.md` frontmatter ↔ `references/` 实际内容一致；`package.json` 与 `skills.json` 的 `version` 一致；`node scripts/validate.mjs` 通过。
2. **文档**：`docs/` 手写页与根 `README.md` 逐篇过触达面；`docs/changelog.md`、`docs/catalog.md`、`docs/skills/*.md`、`docs/site-nav.json` 为生成物，只核对镜像结果与源一致，不手改。手写文档中出现的 `fxri-*` 技能标识必须在 `skills.json` 登记。
3. **技能版本**：技能内容变更须递增该技能 `version`，并同步 frontmatter `metadata.version` 与正文首部 `> 本技能版本 x.y.z`；小修 +patch，能力级 +minor。
4. **变更集**：触及 `skills/`、`docs/` 手写页、`skills.json`、`categories.json`、`scripts/gen-catalog.mjs` 时，必须在 `.changeset/` 新增变更集，条目逐条以 `- 类型：描述` 书写。
5. **git 基准**：上述检查以 `CHANGESET_BASE_REF` / CI 目标分支 / 变更前提交 / `HEAD~1` 为基准；无基准时打印「跳过（无 git 基准）」，不得静默跳过。

## 验收方式

- 跑 `node scripts/verify.mjs`——本地与两处 CI 共用的单一步骤清单（结构校验 → CHANGELOG 镜像一致 → 文档站构建）；
- `toolkit tasks check` 的 error 与 warn 均为 0；
- 复核发现遗漏必须当场回补，不允许「下次再说」。

## 协作流程约束

- 涉及代码编写、文件修改、命令执行的任务，先输出结构化实施方案，经确认后执行；
- 任务管理走 `@fxri/toolkit` 的 fxri-* 技能；任务收尾按「归档 → 验收 → 提交」执行；
- 提交信息遵循 `类型：描述` 全中文格式；一次提交只做一件事；
- 任务时间字段按四级时间源取证，禁止估算或用收尾时刻冒充任务真实发生时刻；
- 文档与技能示例使用泛化命名，不写公司专属规则、客户数据、内网地址、本机绝对路径与外部仓库实名；
- 新建技能须符合 `conventions` 的 `C-3` / `C-4`：命名三段式且主题不占领域大词，分类按使用场景与交付物归属。
