---
owner: 唐启云
status: 待办
created: 20261102
updated: 20261102
completed: ''
depends_on: []
scope: playbook
---

# playbook 文档站与 CI

批次：方弦实践集　计划位置：5　前置：任务 4

## 背景

playbook 需要独立文档站、目录生成与双平台 CI，保证技能目录、安装方式与公开内容检查可持续维护。

## 实施方案

1. VitePress 文档站：`docs/.vitepress/config.mts`、首页、快速开始、catalog、profiles、presets、contributing、privacy、faq、changelog。
2. `gen-catalog.mjs` 从 `skills.json` / `categories.json` 生成 catalog 与 sidebar；CI 检查生成物是否最新。
3. `scripts/verify.mjs` 聚合门禁：validate → 敏感扫描 → catalog 一致性 → docs build；本地与 CI 共用。
4. GitLab CI 主门禁 + GitHub Actions；GitHub Pages / GitLab Pages 双部署；Gitee 只做镜像。
5. README 徽章、安装命令、三远端说明；tag 与 release 三端同步。
6. changeset / CHANGELOG 调用全局 toolkit，不在本仓实现 changelog 逻辑。

## 影响范围

| 文件 | 结论 |
| --- | --- |
| `docs/` | 新增文档站 |
| `scripts/verify.mjs` / `gen-catalog.mjs` | 门禁与目录生成 |
| `.gitlab-ci.yml` / `.github/workflows/` | 双 CI + 双 Pages |
| `README.md` | 安装与徽章 |
| `.changeset/` / `CHANGELOG.md` | 发版记录 |

## 验证方式

- `node scripts/verify.mjs` 通过。
- `pnpm docs:build` 通过（死链检查）。
- GitHub Pages / GitLab Pages 构建成功；catalog 与 manifest 一致。

## 回滚方案

`git revert` 本任务提交；文档站与 CI 不影响技能内容本身。
