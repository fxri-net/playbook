---
"@fxri/playbook": patch
---

- 新增：`sync:version` 脚本，`changelog:version` 升版本后自动回写 `skills.json`，发版不再人工补版本
- 新增：验收增加「版本一致性」门禁步骤，`package.json` 与 `skills.json` 版本不一致即失败
