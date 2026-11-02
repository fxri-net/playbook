---
owner: 唐启云
status: 待办
created: 20261102
updated: 20261102
completed: ''
depends_on: []
scope: playbook
---

# playbook Office 等分类预留

批次：方弦实践集　计划位置：7　前置：任务 4

## 背景

playbook 不只服务开发，需要为办公、写作、研究等类别预留分类与目录，避免以后扩展时重构 manifest 与文档。

## 实施方案

1. `categories.json` 登记 office / writing / research 等 category 的说明与状态；不建空技能目录，避免空壳。
2. `skills.json` 允许 category 扩展；未知 category 默认归 `imported`，不阻断第三方源。
3. 文档站增加分类说明与“如何新增 category”的贡献指南。
4. 新增 category 的判据：独立受众、至少 3 个规划技能、无法归入现有类别；否则用 tag。

## 影响范围

| 文件 | 结论 |
| --- | --- |
| `categories.json` | 追加分类说明 |
| `docs/contributing.md` | 新增 category 流程 |
| `skills.json` | 不新增空条目 |

## 验证方式

- `node scripts/validate.mjs` 通过。
- catalog 能展示空分类说明，不产生空技能卡。
- 第三方 source 的未知 category 不报错。

## 回滚方案

`git revert` 本任务提交；分类注册与文档回退，不影响已有技能。
