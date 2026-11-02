---
name: fxri-dev-profile-vue
description: Vue 3 开发规范：组合式 API、组件边界、状态管理、路由与测试的通用实践。适用于编写或评审 Vue 组件、拆分组件职责、设计状态与路由、排查响应式与生命周期问题时使用——含「Vue 规范」「Composition API」「响应式」「组件拆分」等说法及近义表达。不用于其他框架的组件模式、通用 Web 可访问性与性能基线（见 fxri-dev-profile-web）、后端接口设计。
license: MIT
metadata:
  version: "0.1.0"
  tier: optional
  scope: [vue]
  triggers: ["Vue 开发", "Vue 3 组合式 API", "Vue 组件拆分", "Vue 响应式", "Vue 路由与状态"]
  category: dev
  type: profile
  requires: ["fxri-dev-profile-web"]
  author: fxri
  source: https://github.com/fxri-net/playbook
---

# Vue 开发规范

> 本技能版本 0.1.0（随 playbook 技能集分发）。被问版本时即报此值；与磁盘版本不一致即说明会话上下文已过期。

## 何时使用

- 编写或修改 Vue 3 组件、组合式函数、路由与状态
- 评审组件职责、响应式写法与生命周期使用
- 排查响应式丢失、重复渲染、状态耦合问题

前置：通用 Web 语义、可访问性、性能与安全基线见 `fxri-dev-profile-web`。不用于其他框架或后端设计。

## 核心原则

1. **组合式 API 优先**：同一职责的响应式状态与方法收进一个组合式函数，组件只负责编排与渲染。
2. **组件边界按职责切**：展示组件只接收 props / 派发事件；数据获取与业务规则放组合式函数或 store。
3. **单向数据流**：props 只读；需要修改时派发事件或调用受控方法，不在子组件直接改父状态。
4. **响应式来源唯一**：同一份状态只保留一个真源；派生值用 `computed`，不用 `watch` 手工同步。
5. **副作用有边界**：请求、订阅、定时器在 `onMounted` / `onUnmounted` 成对管理；避免在 `watch` 中做可推导的转换。
6. **模板保持简单**：复杂表达式抽成 `computed` 或方法；模板里不做数据转换与副作用。
7. **可测试**：组合式函数可脱离组件测试；组件测试覆盖关键交互与边界状态。

## 工作流程

1. 先画清数据流：谁拥有状态、谁读取、谁修改。
2. 按职责拆组件与组合式函数，再写模板与样式。
3. 为关键组合式函数与交互补测试。
4. 检查是否有重复真源、未清理副作用与可推导的 `watch`。

## 检查清单

- [ ] 同一状态只有一个真源，派生值用 `computed`
- [ ] props 未被直接修改
- [ ] 订阅、定时器、监听在卸载时清理
- [ ] 模板无复杂表达式与副作用
- [ ] 组合式函数可独立测试
- [ ] 通用 Web 可访问性与性能基线已满足

详细判据与反例见 `references/vue-principles.md`。
