# 贡献指南

## 新增技能

1. 在 `skills/` 下创建 `fxri-<分类>-<名称>/` 目录，目录名与 frontmatter `name` 一致。
2. 按现有技能的 frontmatter 补齐 `metadata`：`version`、`tier`、`scope`、`triggers`、`category`、`type`、`requires`。
3. 正文首部写 `> 本技能版本 x.y.z（随 playbook 技能集分发）。`，与 frontmatter 版本保持一致。
4. 在 `skills.json` 登记 `name` / `path` / `category` / `type` / `title` / `summary` / `version` / `requires`。
5. 细节下沉 `references/`；主干 `SKILL.md` 保持精简（行数 < 200）。
6. 运行 `node scripts/gen-catalog.mjs` 更新 catalog，再运行 `node scripts/validate.mjs`。

## 内容边界

- 只写通用原则与可复用流程，不写公司专属规则、客户数据、内网地址与本机绝对路径。
- 示例使用泛化命名（如 `src/cli.ts L103`），不出现外部仓库实名。
- 版本递增：内容小修 +patch，新增能力 +minor。
- 规模预算：`bundle` ≤ 800 字符、`template` ≤ 3000 字符、其余 ≤ 8000 字符；`SKILL.md` 行数 < 200。

## 三方一致质量门

任何技能、文档、清单或生成脚本的改动，归档前须完成：

1. **能力**：`skills.json` ↔ `SKILL.md` frontmatter ↔ `references/` 一致；`package.json` 与 `skills.json` 的 `version` 一致。
2. **文档**：`docs/` 手写页与 `README.md` 逐篇过触达面；生成物（`docs/changelog.md`、`docs/catalog.md`、`docs/skills/*.md`、`docs/sidebar.json`）只核对镜像结果与源一致。
3. **技能版本**：技能内容变更须递增该技能版本，frontmatter `metadata.version` 与正文首部版本行双写一致。
4. **变更集**：触及 `skills/`、`docs/` 手写页、`skills.json`、`categories.json`、`scripts/gen-catalog.mjs` 时，须在 `.changeset/` 新增变更集，条目逐条以 `- 类型：描述` 书写。

门禁以 git 基准判断「是否新增变更集 / 技能版本是否递增」，无基准时打印跳过、不静默放行：

```bash
node scripts/verify.mjs
```

## 提交

提交信息遵循 `类型：描述` 全中文格式；一次提交只做一件事。

## 更新日志

- 根 `CHANGELOG.md` 为真源，`docs/changelog.md` 是生成物，不手改。
- 修改 `CHANGELOG.md` 后执行 `toolkit changelog --title "更新日志" --no-frontmatter doc` 生成镜像，随同一次提交入库。
- 本地门禁 `node scripts/verify.mjs` 会检查镜像一致；未安装全局 toolkit 时打印跳过，远程 CI 不依赖该工具。
