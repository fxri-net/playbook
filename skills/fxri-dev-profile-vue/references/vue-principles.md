# Vue 规范详解

## 格式化

- 读取项目 `.prettierrc`（或等价配置），按项目现状执行。
- 引号、分号、行尾逗号、行宽都不硬编码；项目配置为双引号 / 无分号 / 行尾全加逗号 / 行宽 160 时，就按该配置写。
- 换项目时重新读取该项目配置，不沿用上一个项目的格式。

## 状态三分类

### enums

- 枚举字典集合，用 `reactive` 包裹。
- 固定注释：`/** 枚举集合 */`。
- 所有枚举优先放这里；放进去会报错时才调整。

### datas

- 响应式状态数据集合，用 `reactive` 包裹。
- 固定注释：`/** 数据集合 */`。
- 所有变量优先放这里；放进去会报错时才调整。

### elems

- UI 组件引用 + 不应被双向绑定的数据 / 模型。
- 用普通对象，非响应式。
- 固定注释：`/** 元素集合 */`。

### 归属与条件

- 归属顺序：枚举 → `enums`，变量 → `datas`，UI 引用 / 非双向绑定 → `elems`。
- 三个集合内每个变量单独简短注释。
- 只在业务代码支持且有该结构时要求；不支持或没有时不强制生成。

## Defines + AxiosParse

- `Defines` 只做干净的定义，放在文件顶部。
- 存在 `AxiosParse` 时优先用它解析接口类型，不手写重复结构。
- 业务代码通过 `Defines["base"]["param"]`、`Defines["base"]["data"]` 这类路径引用。
- 反例：接口结构在多个文件重复手写，或 `Defines` 定义散落在业务逻辑中间。

## 顺序

### 工具 / 服务文件

`imports → 类型定义 → 常量 → 函数 → 导出`。

函数名按英文首字母排序，示例：`doBase → doData → doDom → doInfo → doOption → doParam → doRoute → doSafe → doSite → doUser`。排序规则见 `fxri-dev-profile-web`。

### 组件 SFC 三块

`<script setup lang="ts"> → <template> → <style scoped lang="scss">`。

- 这只是举例。
- 语言为 `js/tsx/jsx` 或无 `scoped` 时不做强制；`template` / `style` 同理。
- 仅当与项目实际写法完全一致时，按项目内的配置项顺序执行。

### `<script setup>` 内部

通用顺序：`imports → defineOptions → interface Defines → enums → elems → datas → 函数`。

不通用时按项目实际情况灵活调整。

## 注释语法

- **`@file`**：文件头已有的不动，新文件不加。
- **固定前置注释**：
  - `defineOptions` → `/** 派发选项 */`
  - `interface Defines` → `/** 定义集合 */`
  - enums → `/** 枚举集合 */`
  - elems → `/** 元素集合 */`
  - datas → `/** 数据集合 */`
- **公共函数 JSDoc**：`/** 描述 @param … @return … @example */`；参数按实际顺序；函数名排序按 `fxri-dev-profile-web`。
- 行内注释讲「为什么」、用词统一等通用要求见 `fxri-dev-profile-web`。
