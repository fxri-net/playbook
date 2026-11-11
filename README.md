<p align="center">
  <img src="./docs/public/logo.png" width="128" alt="方弦实践集">
</p>

# 方弦实践集

[![CI](https://github.com/fxri-net/playbook/actions/workflows/ci.yml/badge.svg)](https://github.com/fxri-net/playbook/actions/workflows/ci.yml)
[![Node](https://img.shields.io/badge/node-%E2%89%A520.19-brightgreen)](./docs/quick-start.md)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue)](./LICENSE)
[![文档站](https://img.shields.io/badge/docs-fxri--net.github.io%2Fplaybook-blueviolet)](https://fxri-net.github.io/playbook/)

面向 AI 协作的综合实践技能集：规范与流程沉淀为技能，按项目与语言组合，按需加载。每个技能是一个独立目录，遵循 [Agent Skills 开放标准](https://agentskills.io)：`SKILL.md` 为入口，细节下沉 `references/`。

> 定位：把散落在口头约定与历史项目里的实践经验，收敛成 agent 能直接执行的技能。通用原则落在档案，语言、框架与场景差异单独成技能，用 `requires` 组合；按触发加载，不常驻上下文。

## ✨ 能力矩阵

| 能力 | 用途 | 入口 |
| --- | --- | --- |
| 前端通用规范 | 共享工具前缀、逐变量注释、注释讲为什么、函数名排序、效果图识别，以及精度、取值、提示、布局与死代码等跨框架写法 | [`fxri-dev-profile-web`](./skills/fxri-dev-profile-web/SKILL.md) |
| Vue 3 规范 | 格式化、状态三分类、Defines、SFC 顺序与注释语法，以及 ref 片段感知、getter 暴露、数据源容器与表单状态机；`requires` 通用规范 | [`fxri-dev-profile-vue`](./skills/fxri-dev-profile-vue/SKILL.md) |
| 设计还原规范 | 素材分工与字段口径、标注直读、整图切片热区、内容文本可读下限、切片获取与可用态判定 | [`fxri-dev-profile-restore`](./skills/fxri-dev-profile-restore/SKILL.md) |
| 接口契约与数据展示规范 | 码值映射可读文本、字典选项来源、契约落差确认、响应信封以运行时为准 | [`fxri-dev-profile-display`](./skills/fxri-dev-profile-display/SKILL.md) |
| 构建与质量规范 | 告警分源治理、barrel 断边、质量门零告警、契约生成优先 | [`fxri-dev-profile-build`](./skills/fxri-dev-profile-build/SKILL.md) |
| 文档站导航规范 | 分类骨架、分组名上限、顶栏规范、扩展与校验规则 | [`fxri-docs-profile`](./skills/fxri-docs-profile/SKILL.md) |
| 技能目录 | 按分类浏览全部技能与预留状态 | [`catalog.md`](./catalog.md) |
| 结构门禁 | 结构、命名、体积、技能标识、版本递增与变更集校验 | `pnpm verify` |

## 📚 文档

| 文档 | 适合谁 |
| --- | --- |
| [快速开始](./docs/quick-start.md) | 第一次接入，想先跑通 |
| [技能目录](./docs/catalog.md) | 按分类浏览全部技能 |
| [档案总览](./docs/profiles.md) | 了解档案与组合方式 |
| [分类说明](./docs/categories.md) | 分类口径与预留状态 |
| [隐私说明](./docs/privacy.md) | 了解技能落盘与数据边界 |
| [贡献指南](./docs/contributing.md) | 想提交新技能或修订条文 |
| [常见问题](./docs/faq.md) | 遇到问题先来这里找 |
| [更新日志](./docs/changelog.md) | 查各版本变更内容 |
| [完整文档站](https://fxri-net.github.io/playbook/) | 在线阅读体验 |

## 📦 安装

技能可作为外部来源交给 `@fxri/toolkit` 安装（临时或永久）：

```bash
# 临时来源：副本写入，只写本次
toolkit skills install --from ./playbook --agent canonical

# 永久来源：登记到 ~/.toolkitrc.json，默认软链，失败降级副本
toolkit skills install --from ./playbook --save playbook --agent canonical

toolkit skills sources            # 查看来源与技能
toolkit skills sources remove playbook --prune
```

也可用上游安装器：

```bash
pnpm dlx skills add fxri-net/playbook --global
```

## 🧩 首批技能

- [`fxri-dev-profile-web`](./skills/fxri-dev-profile-web/SKILL.md)：前端通用规范（共享工具前缀、逐变量注释、函数排序、效果图识别）
- [`fxri-dev-profile-vue`](./skills/fxri-dev-profile-vue/SKILL.md)：Vue 3 规范（格式化、状态三分类、Defines、SFC 顺序、注释语法；`requires` 通用规范）
- [`fxri-docs-profile`](./skills/fxri-docs-profile/SKILL.md)：文档站导航规范（分类骨架、命名上限、顶栏规范、扩展与校验规则）

完整目录见 [catalog.md](./catalog.md)。

## ⚙️ 环境要求

- Node.js >= 20.19.0、pnpm 10
- 技能按需加载，不要求项目内常驻技能文件

## 🛠️ 开发约定

新增技能、校验、发版与门禁流程见 [CONTRIBUTING.md](./CONTRIBUTING.md)。

## 📄 版权信息

作者：唐启云 <tqy@fxri.net>

出品：方弦研究所

版权：Copyright © 2026 唐启云. All rights reserved.

网站：[方弦研究信息网](https://fxri.net:444/)

协议：[MIT License](./LICENSE)

商标："方弦®"为第42类注册商标（注册号89648411），本开源许可不授予商标使用权，详见 [TRADEMARK.md](./TRADEMARK.md)

> 方弦研究所为唐启云个人项目品牌与出品方，非独立法人实体；本软件著作权归唐启云所有。
