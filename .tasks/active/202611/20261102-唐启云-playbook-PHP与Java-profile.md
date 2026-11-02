---
owner: 唐启云
status: 待办
created: 20261102
updated: 20261102
completed: ''
depends_on: []
scope: playbook
---

# playbook PHP 与 Java profile

批次：方弦实践集　计划位置：6　前置：任务 4

## 背景

通用后端原则落在 `fxri-dev-profile-svc`，PHP / Java 只补语言与框架差异，避免每个语言重复写通用规则。

## 实施方案

1. `skills/fxri-dev-profile-php/`：PHP / Composer / PSR / strict types / PHP 8.x 兼容 / vendor 补丁 / Laravel 或 ThinkPHP 通用约定；requires `fxri-dev-profile-svc`。
2. `skills/fxri-dev-profile-java/`：Java / Maven or Gradle / Spring / JPA / 事务传播 / Feign / MQ / 定时任务通用约定；requires `fxri-dev-profile-svc`。
3. 只写语言 / 框架差异，通用后端原则引用 svc，不复制。
4. 更新 `skills.json` 与 catalog；版本双写位；体积与 references 校验。

## 影响范围

| 文件 | 结论 |
| --- | --- |
| `skills/fxri-dev-profile-php/` / `java/` | 新增 |
| `skills.json` | 新增条目与 requires |
| `docs/catalog.md` | 生成物更新 |
| `.changeset/` | 追加条目 |

## 验证方式

- `node scripts/validate.mjs` 通过。
- `requires` 解析正确，安装 php/java 自动带 svc。
- catalog 与 manifest 一致。

## 回滚方案

`git revert` 本任务提交；删除对应技能目录与 manifest 条目即可。
