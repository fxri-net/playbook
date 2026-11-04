---
outline: [2, 2]
---

# 更新日志

> 完整变更历史以根 `CHANGELOG.md` 为准，本页由 `toolkit changelog doc` 自动同步，请勿手改。

## 0.2.6

> 2026-11-03 发布

### 📝 文档更新

- 为分类说明与档案总览页补充二级标题层级，改善文档站阅读结构

## 0.2.5

> 2026-11-03 发布

### ⚡ 优化改进

- 统一 package.json 元数据（author、repository、homepage、keywords 与字段顺序）
- toolkit 相关脚本改为显式探测全局命令，缺失时跳过

## 0.2.4

> 2026-11-03 发布

### ⚡ 优化改进

- 文档站主题升到 2.1，改为中性底 + 单站强调色
- README 补齐定位、能力矩阵与文档索引，首页特性卡补齐到 6 张

## 0.2.3

> 2026-11-03 发布

### ⚡ 优化改进

- 文档站主题升到 1.1，渐变改为覆盖整页

## 0.2.2

> 2026-11-03 发布

### 🔧 功能调整

- 站点与 README 副标题改为面向 AI 协作的工程规范集

### ⚡ 优化改进

- README 移除内部运维信息并补齐版权信息

## 0.2.1

> 2026-11-03 发布

### ⚡ 优化改进

- 文档站接入统一主题，首页补齐图标与「30 秒上手 / 文档索引 / 环境要求」章节

本仓为私有技能内容仓，不发布 npm；版本记录由 `.changeset/` 变更集手工归并到本文件，变更集作为输入、不引入 changesets 运行时依赖。

## 0.2.0

> 2026-11-03 发布

### ✨ 新增功能

- 根 `CHANGELOG.md` 作为更新日志真源，`docs/changelog.md` 改为镜像生成物
- 建立仓库级三方一致质量门：版本一致、技能标识、技能版本递增与变更集新增校验
- 文档站顶部栏补齐「FAQ」「更新日志」入口，固定 FAQ 在前、更新日志在后
- 文档站品牌资产（logo、社交分享图、favicon）与自定义主题样式

### 🔧 功能调整

- `fxri-dev-profile-web` 按前端全局规则重建：共享工具函数前缀、逐变量注释、注释讲为什么、用词统一、函数名首字母排序与效果图识别
- `fxri-dev-profile-vue` 按前端全局规则重建：项目格式化配置、状态三分类、Defines + AxiosParse、文件与 SFC 顺序、`@file` / 固定注释 / JSDoc

### ⚡ 优化改进

- 本地门禁增加 CHANGELOG 镜像一致性检查，未安装全局 toolkit 时跳过
- GitHub 与 GitLab CI 取完整历史作为变更基准，本地支持 `CHANGESET_BASE_REF`
- README 与大标题去掉英文副标题，档案页标题改为中文主题
- 文档站首页 hero 文案与特性卡片优化，导航、页脚、搜索等界面文案统一为中文
- 站点补齐 og 元信息与 sitemap，编辑回链改用 GitHub 主仓
- 三方一致门禁对纯版本提交豁免变更集要求，避免发版提交被自身门禁拦截
- 用户可见的「更新记录」统一改为「更新日志」，覆盖根 CHANGELOG、镜像页、侧边栏、贡献指南与 README

### 🐛 问题修复

- 快速开始页把本仓技能误写为 `core` 必装，实际全部为 `optional`

### 📝 文档更新

- 补充仓库级协作规则、三方一致流程与结构树

### 🧹 清理移除

- 移除 `fxri-dev-profile-svc`、`fxri-dev-profile-php`、`fxri-dev-profile-java` 与 `fxri-meta-preset-tqy`
- 移除预设总览页，`meta` 分类改为 reserved

## 0.1.0

> 2026-11-03 发布

### ✨ 新增功能

- 初始化仓库骨架、manifest、分类与校验 / catalog 脚本
- 首批 `fxri-dev-profile-web` / `fxri-dev-profile-vue` / `fxri-dev-profile-svc` / `fxri-meta-preset-tqy`
- VitePress 文档站、技能页生成与双平台 CI
- `scripts/verify.mjs` 聚合门禁（结构校验 + 文档站构建）
- 分类状态（active / reserved）与 `imported` 保留分类，文档站分类说明页；预留分类不建空技能目录
- `fxri-dev-profile-php` 与 `fxri-dev-profile-java`（requires `fxri-dev-profile-svc`）及对应 references 与 catalog 条目
