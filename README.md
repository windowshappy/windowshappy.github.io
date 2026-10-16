# windowshappy 的博客

基于 [Astro](https://astro.build) 博客模板搭建，通过 GitHub Actions 自动部署到 **GitHub Pages**。

- 线上地址：https://windowshappy.github.io
- 仓库地址：https://github.com/windowshappy/windowshappy.github.io

## 本地开发

```sh
npm install
npm run dev      # 本地预览 http://localhost:4321
npm run build    # 构建到 ./dist/
npm run preview  # 预览构建结果
```

## 写文章

在 `src/content/blog/` 下新建 `.md` 或 `.mdx` 文件，文件名就是 URL 路径（例如 `hello-world.md` → `/blog/hello-world/`）。

Frontmatter 格式（字段在 `src/content.config.ts` 中校验）：

```yaml
---
title: 文章标题
description: 一句话摘要
pubDate: 2026-10-16
heroImage: ../../assets/可选封面图.png   # 可选
---
```

## 站点信息

标题、描述改 `src/consts.ts`；部署域名改 `astro.config.mjs` 里的 `site`。

## 部署

推送到 `main` 分支后，`.github/workflows/deploy.yml` 会自动构建并发布。

首次使用需要在 GitHub 仓库里做一次设置：

**Settings → Pages → Build and deployment → Source 选择 `GitHub Actions`**

之后每次 `git push` 都会自动更新线上站点。

## 目录结构

```text
├── .github/workflows/deploy.yml   # GitHub Pages 自动部署
├── public/                        # 静态资源（原样拷贝，含 .nojekyll）
├── src/
│   ├── assets/
│   ├── components/
│   ├── content/blog/              # 博客文章（Markdown / MDX）
│   ├── layouts/
│   ├── pages/                     # 路由页面
│   ├── styles/
│   ├── consts.ts                  # 站点标题 / 描述
│   └── content.config.ts          # 文章 frontmatter 校验
├── astro.config.mjs
└── package.json
```

## Credit

This theme is based off of the lovely [Bear Blog](https://github.com/HermanMartinus/bearblog/).
