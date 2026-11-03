# 方弦实践集

[![CI](https://github.com/fxri-net/playbook/actions/workflows/ci.yml/badge.svg)](https://github.com/fxri-net/playbook/actions/workflows/ci.yml)

面向 AI 协作的工程规范集：规范沉淀为技能，按项目与语言组合，按需加载。每个技能是一个独立目录，遵循 [Agent Skills 开放标准](https://agentskills.io)：`SKILL.md` 为入口，细节下沉 `references/`。

## 结构

```
.
├── skills/          # 技能目录，目录名 = frontmatter name
├── skills.json      # 技能清单
├── categories.json  # 分类字典
└── catalog.md       # 技能目录（生成物，勿手改）
```

## 安装

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

## 首批技能

- `fxri-dev-profile-web`：前端通用规范（共享工具前缀、逐变量注释、函数排序、效果图识别）
- `fxri-dev-profile-vue`：Vue 3 规范（格式化、状态三分类、Defines、SFC 顺序、注释语法；requires web）

完整目录见 [catalog.md](./catalog.md)。

## 开发

新增技能、校验、发版与门禁流程见 [CONTRIBUTING.md](./CONTRIBUTING.md)。

## 📄 版权信息

作者：唐启云 <tqy@fxri.net>

出品：方弦研究所

版权：Copyright © 2026 唐启云. All rights reserved.

网站：[方弦研究信息网](https://fxri.net:444/)

协议：[MIT License](./LICENSE)

商标："方弦®"为第42类注册商标（注册号89648411），本开源许可不授予商标使用权，详见 [TRADEMARK.md](./TRADEMARK.md)

> 方弦研究所为唐启云个人项目品牌与出品方，非独立法人实体；本软件著作权归唐启云所有。
