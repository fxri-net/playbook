import { readFileSync } from "node:fs"
import { defineConfig } from "vitepress"

// 侧边栏由 scripts/gen-catalog.mjs 从 skills.json 生成，避免手工维护漂移
const skillGroups = JSON.parse(readFileSync(new URL("../sidebar.json", import.meta.url), "utf8"))

// 站点基础路径：GitHub Pages 项目站点默认 /playbook/；GitLab Pages 在 CI 中设 DOCS_BASE=/
const base = process.env.DOCS_BASE ?? "/playbook/"

// 站点规范地址（sitemap hostname 与 og:image 用），其他部署场景经 SITE_URL 覆盖
const siteUrl = process.env.SITE_URL || `https://fxri-net.github.io${base}`

// GitHub 主仓库：社交链接与编辑回链共用
const githubRepo = "https://github.com/fxri-net/playbook"

export default defineConfig({
  lang: "zh-CN",
  title: "方弦实践集",
  titleTemplate: ":title - 方弦实践集",
  description: "可被 AI agent 按需加载的通用技能内容仓",
  base,
  cleanUrls: true,
  lastUpdated: true,
  head: [
    ["link", { rel: "icon", href: `${base}logo.png` }],
    ["meta", { property: "og:type", content: "website" }],
    ["meta", { property: "og:site_name", content: "方弦实践集" }],
    ["meta", { property: "og:title", content: "方弦实践集" }],
    ["meta", { property: "og:description", content: "可被 AI agent 按需加载的通用技能内容仓" }],
    // og:image 必须为绝对地址，社交平台据此抓取分享卡片
    ["meta", { property: "og:image", content: `${siteUrl}og-image.png` }],
    ["meta", { property: "og:url", content: siteUrl }],
    ["meta", { name: "twitter:card", content: "summary_large_image" }],
  ],
  // 生成 sitemap.xml；hostname 带 base 子路径，保证各页 URL 拼接正确
  sitemap: { hostname: siteUrl },
  themeConfig: {
    // 导航栏 logo（字符串路径由 VitePress 自动拼接 base 前缀）
    logo: "/logo.png",
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
          { text: "档案总览", link: "/profiles" },
          { text: "预设总览", link: "/presets" },
          { text: "隐私与安全", link: "/privacy" },
          { text: "更新记录", link: "/changelog" },
          { text: "贡献指南", link: "/contributing" },
        ],
      },
    ],
    // 本地搜索 + 中文界面文案
    search: {
      provider: "local",
      options: {
        translations: {
          button: { buttonText: "搜索文档", buttonAriaLabel: "搜索文档" },
          modal: {
            noResultsText: "未找到相关结果",
            resetButtonTitle: "清除查询条件",
            footer: { selectText: "选择", navigateText: "切换", closeText: "关闭" },
          },
        },
      },
    },
    outline: { level: [2, 3], label: "本页目录" },
    docFooter: { prev: "上一篇", next: "下一篇" },
    lastUpdated: { text: "最后更新于" },
    returnToTopLabel: "回到顶部",
    sidebarMenuLabel: "菜单",
    socialLinks: [{ icon: "github", link: githubRepo }],
    editLink: {
      pattern: `${githubRepo}/edit/main/docs/:path`,
      text: "在 GitHub 上编辑此页",
    },
    footer: {
      message: "MIT 开源协议",
      copyright: "Copyright © 2026 方弦实践集",
    },
  },
})
