---
"@fxri/playbook": patch
---

- 新增：仓库级三方一致质量门，校验 `package.json` 与 `skills.json` 版本一致、手写文档技能标识已登记、技能内容变更须递增版本、技能与文档改动须新增变更集
- 优化：GitHub 与 GitLab CI 取完整历史作为变更基准，本地支持 `CHANGESET_BASE_REF` 指定基准
- 修复：快速开始页把本仓技能误写为 `core` 必装，实际全部为 `optional`
- 文档：补充仓库级协作规则、三方一致流程与结构树
