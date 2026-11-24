# 档案总览

Profile 是各实践领域的规范与流程，按通用层、框架层与场景层拆分，彼此用 `requires` 组合，不复制通用规则。

## 编码档案

| 技能 | 说明 | 依赖 |
| --- | --- | --- |
| `fxri-code-profile-core` | 跨语言 / 跨端的核心原则：架构层统一（契约、真源、基座、输出通道）与表达层从权（截断、折叠、命名、路径省略），含从权边界与双侧反例 | 无 |
| `fxri-code-profile-web` | 与语言、框架、语法无关的通用约定：共享工具前缀、逐变量注释、函数排序、效果图识别，以及精度、取值、提示、布局与死代码等跨框架写法 | 无 |
| `fxri-code-profile-vue` | Vue 3：格式化、状态三分类、Defines + AxiosParse、SFC 顺序、注释语法，以及 ref 片段感知、getter 暴露、数据源容器与表单状态机 | `fxri-code-profile-web` |
| `fxri-code-profile-restore` | 按设计稿还原：素材与字段口径、标注直读、整图热区、可读下限、切片获取与可用态判定 | 无 |
| `fxri-code-profile-display` | 接口契约与数据展示：码值映射、字典来源、契约落差确认、信封以运行时为准 | 无 |
| `fxri-code-profile-build` | 构建与质量：告警分源治理、barrel 断边、质量门零告警、改动面裁剪、契约生成优先 | 无 |

## 写作档案

文档站写作规范（分类骨架、页面标题「显示名（标识）」、索引与行内引用口径、导航短别名与 404 兜底）随 `@fxri/toolkit` 分发，
不在本仓维护；技能名与旧技能清理见 [0.5.0 迁移](./migrations/0.5.0)。

## 组合方式

`requires` 会自动补全：选择 Vue profile 时会一并安装 Web profile。

```bash
toolkit skill install --source ./playbook --skills fxri-code-profile-vue --agent canonical
```

后续按需要在 `skills/` 中补充其他领域的档案。
