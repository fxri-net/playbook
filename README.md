# 方弦实践集

[![CI](https://github.com/fxri-net/playbook/actions/workflows/ci.yml/badge.svg)](https://github.com/fxri-net/playbook/actions/workflows/ci.yml)
[![GitLab CI](https://git.fxy.ink:444/fxri/develop/0001.base/playbook/badges/main/pipeline.svg)](https://git.fxy.ink:444/fxri/develop/0001.base/playbook)

可被 AI agent 按需加载的通用技能内容仓。每个技能是一个独立目录，遵循 [Agent Skills 开放标准](https://agentskills.io)：`SKILL.md` 为入口，细节下沉 `references/`。

## 远端

- 主仓（GitLab）：`origin`
- GitHub：`github`
- Gitee：`gitee`（只读镜像，不接收 PR）

推送与发布时三端同步；标签与 release 以主仓为准。

## 结构

```
.
├── AGENTS.md            # 仓库级协作规则与三方一致质量门
├── skills.json          # 技能清单（formatVersion / name / version / skills[]）
├── categories.json      # 分类字典（dev / office / writing / research / design / data / ops / meta / imported）
├── skills/              # 扁平技能目录，目录名 = frontmatter name
├── CHANGELOG.md         # 更新日志真源；docs/changelog.md 由它镜像生成
├── scripts/
│   ├── validate.mjs     # 结构校验、技能标识、版本递增与变更集门禁
│   ├── gen-catalog.mjs  # 从 skills.json 生成 catalog.md 与 docs/sidebar.json
│   └── check-changelog-doc.mjs # 本地 CHANGELOG 镜像检查（未装全局 toolkit 时跳过）
├── catalog.md           # 生成物，勿手改
└── docs/sidebar.json    # 生成物，供文档站使用
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

```bash
node scripts/gen-catalog.mjs   # 更新 catalog.md 与 docs/sidebar.json
node scripts/validate.mjs      # 校验
```

规模预算：`bundle` ≤ 800 字符、`template` ≤ 3000 字符、其余 ≤ 8000 字符；`SKILL.md` 行数 < 200。

## 许可

MIT，见 [LICENSE](./LICENSE)、[NOTICE](./NOTICE)、[TRADEMARK.md](./TRADEMARK.md)。
