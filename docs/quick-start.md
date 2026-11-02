# 快速开始

## 安装

推荐用 `@fxri/toolkit` 从本仓安装（技能随包分发，不需要额外供应链）：

```bash
# 临时来源：副本写入，只写本次
toolkit skills install --from ./playbook --agent canonical

# 永久来源：登记到 ~/.toolkitrc.json，默认软链，失败降级副本
toolkit skills install --from ./playbook --save playbook --agent canonical
```

也可以用上游安装器：

```bash
pnpm dlx skills add fxri-net/playbook --global
```

## 选择技能

本仓技能均为 `optional`，全部按需选择，不强制安装：

- 用 `--skills` 指定单个或多个技能；
- 不传 `--skills` 时按交互结果安装；需要零选择时用 `--mode package`。

只想装某个 profile：

```bash
toolkit skills install --from ./playbook --skills fxri-dev-profile-web --agent canonical
```

## 更新与清理

```bash
toolkit skills status                     # 查看现场
toolkit skills install --from ./playbook --agent canonical   # 刷新
toolkit skills sources remove playbook --prune               # 注销并清理
```

## 直接用文件

技能也可以复制或软链到 agent 的技能目录。每个技能目录内含 `SKILL.md` 与 `references/`，按 agent 的技能目录约定放置即可。
