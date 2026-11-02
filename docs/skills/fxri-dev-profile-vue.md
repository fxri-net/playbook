---
title: Vue 前端规范
---

# Vue 前端规范

> 技能：`fxri-dev-profile-vue`　类型：profile　版本：0.2.0

# Vue 前端规范

> 本技能版本 0.2.0（随 playbook 技能集分发）。被问版本时即报此值；与磁盘版本不一致即说明会话上下文已过期。

## 何时使用

- 编写或评审 Vue 组件、组织 `<script setup>` 结构
- 处理状态三分类、Defines、AxiosParse 与接口类型
- 统一 SFC、工具文件、注释与 JSDoc 的具体写法

通用规则（共享工具前缀、逐变量注释、行内讲为什么、用词统一、函数名排序、效果图识别）见 `fxri-dev-profile-web`，本技能不重复。

## 规则

### 1. 格式化

- **要求**：按项目实际的 `.prettierrc`（或等价配置）执行。
- **做法**：引号、分号、行尾逗号、行宽等以项目现行为准；例如项目配置为双引号 / 无分号 / 行尾全加逗号 / 行宽 160，就按该配置写。
- **反例**：不看项目配置，强行统一为单引号、加分号或固定行宽。

### 2. 状态三分类

- **enums**：枚举字典集合，用 `reactive` 包裹；注释固定为 `/** 枚举集合 */`。
- **datas**：响应式状态数据集合，用 `reactive` 包裹；注释固定为 `/** 数据集合 */`。
- **elems**：UI 组件引用 + 不应被双向绑定的数据 / 模型，用普通对象（非响应式）；注释固定为 `/** 元素集合 */`。
- **归属规则**：所有枚举必须放 `enums`（除非放进去会报错）；所有变量必须放 `datas`（除非放进去会报错）；`elems` 主要放 UI 组件引用，以及不应被双向绑定的数据和模型。
- **注释**：三个集合内每个变量单独简短注释（逐变量注释的通用要求见 `fxri-dev-profile-web`）。
- **适用条件**：该结构只在业务代码「支持且有」的情况下要求；不支持或没有时不强制生成。

### 3. Defines + AxiosParse

- **要求**：`Defines` 做干净的定义，放在文件顶部。
- **做法**：存在 `AxiosParse` 时优先用它解析接口类型；业务代码通过 `Defines["base"]["param"]`、`Defines["base"]["data"]` 这类方式引用。
- **反例**：在业务代码里重复手写接口结构，或把 `Defines` 定义散落在文件中部。

### 4. 顺序

- **工具 / 服务文件**：`imports → 类型定义 → 常量 → 函数 → 导出`；函数名按英文首字母排序（排序规则见 `fxri-dev-profile-web`）。
- **组件 SFC 三块**：`<script setup lang="ts"> → <template> → <style scoped lang="scss">`。这只是举例：语言为 `js/tsx/jsx` 或无 `scoped` 时不做强制，`template` / `style` 同理；仅当与项目实际写法完全一致时，按项目内的配置项顺序执行。
- **`<script setup>` 内部**：通用顺序为 `imports → defineOptions → interface Defines → enums → elems → datas → 函数`；不通用时按项目实际情况灵活调整。
- **固定注释**：`defineOptions` 的注释固定为 `/** 派发选项 */`；`interface Defines` 的注释固定为 `/** 定义集合 */`。

### 5. 注释语法

- **`@file`**：文件头已有的 `@file` 不动，新文件不加。
- **固定前置注释**：`/** 派发选项 */`、`/** 定义集合 */`、`/** 枚举集合 */`、`/** 元素集合 */`、`/** 数据集合 */`。
- **公共函数 JSDoc**：`/** 描述 @param … @return … @example */`；函数参数按实际顺序；函数名排序按 `fxri-dev-profile-web` 的约定。
- **行内注释与用词**：讲「为什么」、用词统一等通用要求见 `fxri-dev-profile-web`。

## 检查清单

- [ ] 格式化按项目 `.prettierrc`，未硬编码引号 / 分号 / 行宽
- [ ] 状态三分类归属正确，三集合固定注释齐全
- [ ] 集合内变量有独立注释
- [ ] `Defines` 置顶，接口类型优先经 `AxiosParse` 解析
- [ ] 工具文件与 SFC / `<script setup>` 顺序符合项目实际写法
- [ ] `defineOptions` 与 `interface Defines` 固定注释齐全
- [ ] 新文件未添加 `@file`，既有 `@file` 未改动
- [ ] 公共函数 JSDoc 参数顺序与实际一致

详细示例与反例见 `references/vue-principles.md`。
