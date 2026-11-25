---
"@fxri/playbook": patch
---

- 修改：build / display / restore / vue 的「每条规则都带两段」改为如实表述（多数标注、未标注为通用要求），不再承诺所有规则都有适用前提与项目无对应物
- 修改：vue 的两处 references 反引号路径改为 markdown 链接，纳入链接校验范围
- 修改：web 的 triggers 去掉「设计稿还原」，该触发词归于 fxri-code-profile-restore
- 新增：`scripts/check-changeset.mjs` 并接入 `pnpm verify`，校验变更集文件名、包名键与条目前缀
