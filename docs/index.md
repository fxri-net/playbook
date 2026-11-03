---
layout: home
# 首页无正文 h1，显式给 title 避免浏览器标签出现「方弦实践集 - 方弦实践集」重复
title: 把团队规范变成 AI 能直接执行的技能

hero:
  name: 方弦实践集
  text: 把团队规范变成 AI 能直接执行的技能
  tagline: 从项目实践中提炼约定，按档案与技能组合；写代码、审代码、出文档，都落在同一套标准上
  actions:
    - theme: brand
      text: 快速开始
      link: /quick-start
    - theme: alt
      text: 技能目录
      link: /catalog

features:
  - icon: 🧩
    title: 按需加载
    details: 每个技能独立目录，agent 只加载触发到的正文，不常驻上下文。
  - icon: 🧱
    title: 组合而非重复
    details: 通用原则落在档案，语言与框架差异单独成技能，用 requires 组合。
  - icon: ✅
    title: 可校验
    details: 结构、命名、体积、技能标识、版本递增与变更集都有脚本门禁。
---

## 30 秒上手

装好 toolkit 后把技能分发到各 agent 的全局技能目录，之后在会话里按场景触发即可：

```bash
pnpm add -g @fxri/toolkit
toolkit skills install
```

只想先看内容，可以直接浏览[技能目录](./catalog)。

## 文档索引

| 文档                          | 适合谁                   |
| ----------------------------- | ------------------------ |
| [快速开始](./quick-start)     | 第一次接入，想先跑通     |
| [技能目录](./catalog)         | 按分类浏览全部技能       |
| [档案总览](./profiles)        | 了解档案与组合方式       |
| [分类说明](./categories)      | 分类口径与预留状态       |
| [贡献指南](./contributing)    | 想提交新技能或修订条文   |
| [常见问题](./faq)             | 遇到问题先来这里找       |
| [更新日志](./changelog)       | 查各版本变更内容         |

## 环境要求

- Node.js >= 20.19.0、pnpm 10
- 技能按需加载，不要求项目内常驻技能文件
