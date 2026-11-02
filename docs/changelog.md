# 更新日志

> 完整变更历史以根 `CHANGELOG.md` 为准，本页由 `toolkit changelog doc` 自动同步，请勿手改。

本仓为私有技能内容仓，不发布 npm；版本记录由 `.changeset/` 变更集手工归并到本文件，变更集作为输入、不引入 changesets 运行时依赖。

## 0.1.0

- 新增：初始化仓库骨架、manifest、分类与校验 / catalog 脚本
- 新增：首批 `fxri-dev-profile-web` / `fxri-dev-profile-vue` / `fxri-dev-profile-svc` / `fxri-meta-preset-tqy`
- 新增：VitePress 文档站、技能页生成与双平台 CI
- 新增：`scripts/verify.mjs` 聚合门禁（结构校验 + 文档站构建）
- 新增：分类状态（active / reserved）与 `imported` 保留分类，文档站分类说明页；预留分类不建空技能目录
- 新增：`fxri-dev-profile-php` 与 `fxri-dev-profile-java`（requires `fxri-dev-profile-svc`）及对应 references 与 catalog 条目
