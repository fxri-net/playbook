import { readFileSync } from "node:fs"
import { defineConfig } from "vitepress"

// 侧边栏由 scripts/gen-catalog.mjs 从 skills.json 生成，避免手工维护漂移
const skillGroups = JSON.parse(readFileSync(new URL("../sidebar.json", import.meta.url), "utf8"))

export default defineConfig({
  lang: "zh-CN",
  title: "方弦实践集",
  description: "可被 AI agent 按需加载的通用技能内容仓",
  // GitHub Pages 项目站点默认 /playbook/；GitLab Pages 在 CI 中设 DOCS_BASE=/
  base: process.env.DOCS_BASE ?? "/playbook/",
  cleanUrls: true,
  lastUpdated: true,
  themeConfig: {
    nav: [
      { text: "快速开始", link: "/quick-start" },
      { text: "技能目录", link: "/catalog" },
      { text: "档案", link: "/profiles" },
      { text: "贡献", link: "/contributing" },
      { text: "FAQ", link: "/faq" },
      { text: "更新日志", link: "/changelog" },
    ],
    sidebar: [
      {
        text: "开始",
        items: [
          { text: "快速开始", link: "/quick-start" },
          { text: "常见问题", link: "/faq" },
        ],
      },
      {
        text: "技能",
        items: [
          { text: "技能目录", link: "/catalog" },
          { text: "分类说明", link: "/categories" },
        ],
      },
      ...skillGroups,
      {
        text: "档案与说明",
        items: [
          { text: "Profile 总览", link: "/profiles" },
          { text: "Preset 总览", link: "/presets" },
          { text: "隐私与安全", link: "/privacy" },
          { text: "更新记录", link: "/changelog" },
          { text: "贡献指南", link: "/contributing" },
        ],
      },
    ],
    socialLinks: [{ icon: "github", link: "https://github.com/fxri-net/playbook" }],
    editLink: {
      pattern: "https://github.com/fxri-net/playbook/edit/main/docs/:path",
      text: "在 GitHub 编辑此页",
    },
    docFooter: { prev: "上一页", next: "下一页" },
    outline: { label: "本页导航" },
    search: { provider: "local" },
  },
})
