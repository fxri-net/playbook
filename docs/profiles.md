# 档案总览

Profile 是工程与文档规范，按通用层、框架层与场景层拆分，彼此用 `requires` 组合，不复制通用规则。

## 前端档案

| 技能 | 说明 | 依赖 |
| --- | --- | --- |
| `fxri-dev-profile-web` | 与语言、框架、语法无关的通用约定：共享工具前缀、逐变量注释、函数排序、效果图识别 | 无 |
| `fxri-dev-profile-vue` | Vue 3：格式化、状态三分类、Defines + AxiosParse、SFC 顺序、注释语法 | `fxri-dev-profile-web` |
| `fxri-dev-profile-restore` | 按设计稿还原：素材与字段口径、标注直读、整图热区、可读下限、切片获取与可用态判定 | 无 |
| `fxri-dev-profile-display` | 接口契约与数据展示：码值映射、字典来源、契约落差确认、信封以运行时为准 | 无 |
| `fxri-dev-profile-build` | 构建与质量：告警分源治理、barrel 断边、质量门零告警、契约生成优先 | 无 |

## 文档档案

| 技能 | 说明 | 依赖 |
| --- | --- | --- |
| `fxri-docs-profile` | 文档站导航规范：分类骨架、分组名上限、顶栏规范、扩展与校验规则 | 无 |

## 组合方式

`requires` 会自动补全：选择 Vue profile 时会一并安装 Web profile。

```bash
toolkit skills install --from ./playbook --skills fxri-dev-profile-vue --agent canonical
```

后续按需要在 `skills/` 中补充其他 profile。
