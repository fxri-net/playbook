# 贡献指南

## 新增技能

1. 在 `skills/` 下创建 `fxri-<分类>-<名称>/`，目录名与 frontmatter `name` 一致。
2. 补齐 frontmatter `metadata`：`version`、`tier`、`scope`、`triggers`、`category`、`type`、`requires`。
3. 正文首部写 `> 本技能版本 x.y.z（随 playbook 技能集分发）。`，与 frontmatter 一致。
4. 在 `skills.json` 登记条目；细节下沉 `references/`。
5. 运行 `node scripts/gen-catalog.mjs` 与 `node scripts/validate.mjs`。

## 内容边界

- 只写通用原则与可复用流程，不写公司专属规则、客户数据、内网地址与本机绝对路径。
- 示例使用泛化命名（如 `src/cli.ts L103`），不出现外部仓库实名。
- 版本递增：内容小修 +patch，新增能力 +minor。

## 新增分类

分类不是标签：只有同时满足以下条件才新增 category，否则用技能描述里的关键词表达：

1. 有独立受众（与现有分类的用户群明显不同）
2. 至少有 3 个规划中的技能
3. 无法归入现有分类

新增时在 `categories.json` 登记 `id` / `label` / `description`，并在本文补充说明；不创建空技能目录。
