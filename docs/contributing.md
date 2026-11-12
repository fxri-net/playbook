# 贡献指南

## 新增技能

1. 在 `skills/` 下创建 `fxri-<领域>-<形态>-<主题>/`，目录名与 frontmatter `name` 一致。领域段取 `categories.json` 的 `id`，形态段取 `profile`（规范）/ `practice`（流程）/ `template`（模板），主题段写具体能力、不得与领域段或形态段重复、不得用 `tool` / `skill` / `general` / `all` 等空泛词；归属按实践领域判定，不看职能、介质或来源。
2. 补齐 frontmatter `metadata`：`version`、`tier`、`scope`、`triggers`、`category`、`type`、`requires`。`scope` 取受控词表 `web` / `vue` / `h5` / `pc` / `app` / `server` / `docs` / `any`，越界会被结构校验拦下；`tier` 取 `core`（跨领域基础、建议常驻）或 `optional`（按需加载）。
3. 正文首部写 `> 本技能版本 x.y.z（随 playbook 技能集分发）。`，与 frontmatter 一致。
4. 在 `skills.json` 登记条目；细节下沉 `references/`。
5. 运行 `node scripts/gen-catalog.mjs` 与 `node scripts/validate.mjs`。

## 内容边界

- 只写通用原则与可复用流程，不写公司专属规则、客户数据、内网地址与本机绝对路径。
- 示例使用泛化命名（如 `src/cli.ts L103`），不出现外部仓库实名。
- 版本递增：内容小修 +patch，新增能力 +minor。

## 三方一致质量门

技能、文档、清单或生成脚本的改动在归档前须完成三方复核：

1. **能力**：`skills.json` ↔ `SKILL.md` frontmatter ↔ `references/` 一致；`package.json` 与 `skills.json` 版本一致。
2. **文档**：手写页与 `README.md` 逐篇过触达面；生成物只核对镜像结果与源一致，不手改。
3. **技能版本**：内容变更递增该技能版本，frontmatter 与正文首部版本行双写一致。
4. **变更集**：触及 `skills/`、`docs/` 手写页、`skills.json`、`categories.json`、`scripts/gen-catalog.mjs` 时新增变更集，条目逐条写 `- 类型：描述`。

本地与 CI 共用同一条验收命令：

```bash
node scripts/verify.mjs
```

门禁以 git 基准判断版本递增与变更集新增；无基准时打印跳过，不静默放行。

## 新增分类

分类不是标签：只有同时满足以下条件才新增 category，否则用技能描述里的关键词表达：

1. 有独立受众（与现有分类的用户群明显不同）
2. 至少有 3 个规划中的技能
3. 无法归入现有分类

新增时在 `categories.json` 登记 `id` / `label` / `description`，并在本文补充说明；不创建空技能目录。
