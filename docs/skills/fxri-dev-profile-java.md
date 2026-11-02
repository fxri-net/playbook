---
title: Java 开发规范
---

# Java 开发规范

> 技能：`fxri-dev-profile-java`　类型：profile　版本：0.1.0

# Java 开发规范

> 本技能版本 0.1.0（随 playbook 技能集分发）。被问版本时即报此值；与磁盘版本不一致即说明会话上下文已过期。

## 何时使用

- 编写或评审 Java / Spring 服务
- 设计事务边界、远程调用、消息消费与定时任务
- 统一构建工具、依赖版本与异常处理

前置：接口契约、幂等、可观测性与安全等通用原则见 `fxri-dev-profile-svc`。不用于其他语言或 JVM 调优。

## 核心原则

1. **构建可复现**：Maven 用 `dependencyManagement` / BOM 统一版本；Gradle 用 version catalog；锁文件与 wrapper 入库。
2. **分层清晰**：Controller 只做协议转换与校验，Service 承载业务与事务，Repository 只做持久化。
3. **事务边界显式**：`@Transactional` 标在 Service 公开方法；明确传播行为与回滚条件，不在事务内做远程调用。
4. **远程调用有边界**：Feign / HTTP 客户端设置连接与读取超时、重试上限与降级；不把远程调用放进事务。
5. **消息幂等**：消费者按消息 ID 去重；失败可重试且不产生重复副作用。
6. **定时任务防重**：多实例部署时用分布式锁或调度平台选主，避免重复执行。
7. **异常与日志**：业务异常与系统异常分开；日志带 traceId，不打印敏感字段。
8. **空值显式**：对外返回值避免 `null` 集合；可选值用 `Optional` 表达，不滥用。

## 工作流程

1. 确认 Java / Spring / 构建工具版本与依赖管理方式。
2. 先定接口、异常与事务边界，再写实现与测试。
3. 远程调用与消息消费补超时、重试、幂等用例。
4. 提交前跑构建、静态检查与测试。

## 检查清单

- [ ] 依赖版本由 BOM / version catalog 统一
- [ ] Controller 无业务逻辑，Service 承载事务
- [ ] `@Transactional` 传播行为与回滚条件明确
- [ ] 事务内无远程调用
- [ ] Feign / HTTP 客户端有超时、重试上限与降级
- [ ] 消息消费按 ID 去重
- [ ] 定时任务在多实例下不重复执行
- [ ] 日志带 traceId 且不含敏感字段

详细判据与反例见 `references/java-principles.md`。
