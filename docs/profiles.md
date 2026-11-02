# 档案总览

Profile 是通用工程原则，按领域拆分，彼此用 `requires` 组合，不复制通用规则。

| 技能 | 说明 | 依赖 |
| --- | --- | --- |
| `fxri-dev-profile-web` | Web 前端：语义、可访问性、性能、安全、兼容 | 无 |
| `fxri-dev-profile-vue` | Vue 3：组合式 API、组件边界、状态、路由、测试 | `fxri-dev-profile-web` |
| `fxri-dev-profile-svc` | 服务端八条核心原则 | 无 |
| `fxri-dev-profile-php` | PHP：strict types、PSR、Composer、版本兼容与框架约定 | `fxri-dev-profile-svc` |
| `fxri-dev-profile-java` | Java / Spring：构建依赖、分层、事务、Feign、MQ、定时任务 | `fxri-dev-profile-svc` |

安装有依赖的 profile 时，`requires` 会自动补全：选择 `fxri-dev-profile-php` 会一并安装 `fxri-dev-profile-svc`。例如 PHP 项目：

```bash
toolkit skills install --from ./playbook --skills fxri-dev-profile-php --agent canonical
```

后续会继续补充其他语言 profile，只写语言与框架差异，通用后端原则引用 `fxri-dev-profile-svc`。
