---
"@fxri/playbook": patch
---

- 修改：`fxri-code-profile-core` 的批量口径改为「交互时通常多选且默认不全选」，去掉「条目较多时」的数量前提；技能版本 0.1.1 → 0.1.2
- 修改：playbook 的版本级别口径改为指向 `@fxri/toolkit` 的 `fxri-release-changelog` 技能，未加载时按 patch 兜底；删除「新增能力 +minor」
