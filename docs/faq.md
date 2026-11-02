# 常见问题

## 技能装到哪里？

由 `@fxri/toolkit` 按作用域决定：全局面写入 `canonical` 主目标与各已检测 agent 目录；项目面写入 `<仓库根>/.agents/skills/` 与已存在的候选目录薄壳。

## 为什么有些技能没装？

安装按 `tier` 与显式选择执行：`optional` 技能需要交互选中、`--all` 或 `--skills` 指定。先用 `toolkit skills status` 查看「未选择但已安装」与「缺失」的区别。

## `requires` 会自动安装吗？

不会。`requires` 是文档与校验用的依赖声明；安装时按依赖顺序显式选择，例如先 web 再 vue。

## 能用上游安装器吗？

可以。`pnpm dlx skills add fxri-net/playbook --global`。不要与 `toolkit` 内置安装混用，避免同名产物互相判为冲突。

## 如何新增分类？

见[贡献指南](./contributing#新增分类)。
