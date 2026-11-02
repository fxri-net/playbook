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

## 提交

提交信息遵循 `类型：描述` 全中文格式；一次提交只做一件事。
