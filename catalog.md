# 技能目录

> 由 `node scripts/gen-catalog.mjs` 从 `skills.json` 生成，请勿手改。

## 编码

| 技能 | 类型 | 说明 |
| --- | --- | --- |
| `fxri-code-profile-build` | profile | 构建与质量规范：告警按来源归属治理、barrel 成员不得回引自身、质量门零告警阻断、接口契约生成优先且生成物不手改。依赖项缺失时相关条目自动跳过。 |
| `fxri-code-profile-display` | profile | 接口契约与数据展示规范：码值映射可读文本、字典型选项取后端字典来源、契约落差先确认口径、运行期不符契约不自行适配、响应信封以运行时为准。依赖项缺失时相关条目自动跳过。 |
| `fxri-code-profile-restore` | profile | 按设计稿还原界面的通用规范：素材分工与字段口径、标注直读与位图佐证、整图切片透明热区、内容文本可读下限、切片获取与平台可用态判定、固定视口实测。依赖项缺失时相关条目自动跳过。 |
| `fxri-code-profile-vue` | profile | Vue 3 前端规范：格式化、状态三分类、Defines + AxiosParse、文件与 SFC 顺序、@file / 固定注释 / JSDoc，以及组件 ref 片段感知、defineExpose 用 getter、数据源驱动容器与表单状态机。 |
| `fxri-code-profile-web` | profile | 与语言、框架、语法无关的前端通用约定：共享工具前缀、逐变量注释、注释讲为什么、用词统一、函数名排序、效果图识别，以及大整数标识、运行期取值、失败提示与加载态、浮层让位、可选链范式、死样式、根地址拼接、间距分工、图标来源、前缀同源、第三方 SDK 与整页刷新。 |

## 写作

| 技能 | 类型 | 说明 |
| --- | --- | --- |
| `fxri-writing-profile-nav` | profile | 文档站导航规范：分类骨架、分组名最多 4 汉字、顶栏不超过 5 项、常见问题与更新日志归帮助、导航校验按规则实现。 |
