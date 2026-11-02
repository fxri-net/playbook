# Profile 总览

Profile 是通用工程原则，按领域拆分，彼此用 `requires` 组合，不复制通用规则。

| 技能 | 说明 | 依赖 |
| --- | --- | --- |
| `fxri-dev-profile-web` | Web 前端：语义、可访问性、性能、安全、兼容 | 无 |
| `fxri-dev-profile-vue` | Vue 3：组合式 API、组件边界、状态、路由、测试 | `fxri-dev-profile-web` |
| `fxri-dev-profile-svc` | 服务端八条核心原则 | 无 |

安装 Vue profile 时，先安装 `fxri-dev-profile-web` 再安装 `fxri-dev-profile-vue`；`toolkit` 的 `--skills` 不会自动展开 `requires`，需要按依赖顺序显式选择。

后续会补充 PHP / Java 等语言 profile，只写语言与框架差异，通用后端原则引用 `fxri-dev-profile-svc`。
