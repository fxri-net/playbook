---
"@fxri/playbook": patch
---

- 优化：文档站导航校验补 404 两条断言（`search: false`、`sitemap.transformItems`），新增构建产物断言脚本
- 修改：`fxri-docs-profile` 升 0.1.3，写明静态断言与产物断言两步，并明确校验脚本须与技能版本同步
- 修复：产物断言改为从 `404.md` 读取一级标题比对搜索索引，避免改标题后检查静默失效
