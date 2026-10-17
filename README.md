# windowshappy 的博客

基于 [Fuwari](https://github.com/saicaca/fuwari) 主题 + [Astro](https://astro.build)，通过 GitHub Actions 自动部署到 **GitHub Pages**。

- 线上地址：https://windowshappy.github.io
- 仓库：https://github.com/windowshappy/windowshappy.github.io

## 环境要求

- Node.js >= 20（本机 v24）
- **pnpm >= 9**（主题强制使用 pnpm，npm/yarn 会被 `preinstall` 拦截）

```sh
npm i -g pnpm@9
```

## 本地开发

```sh
pnpm install
pnpm dev        # http://localhost:4321
pnpm build      # 构建到 dist/，随后运行 pagefind 生成搜索索引
pnpm preview    # 预览构建结果
```

## 写文章

用自带脚本创建，会自动带上 frontmatter 模板：

```sh
pnpm new-post 我的文章标题
# 等价于 pnpm new-post -- <filename>
```

或者手动在 `src/content/posts/` 下新建 `.md` 文件，**文件名即 URL 路径**（`hello-world.md` → `/posts/hello-world/`）：

```yaml
---
title: 文章标题
published: 2026-10-17
description: 一句话摘要，显示在列表和搜索结果中
image: ''            # 封面图路径，可选
tags: [标签一, 标签二]
category: 分类
draft: false         # true 则不在站点显示
lang: ''             # 单篇文章的语言覆盖，可选
---
```

主题支持的扩展语法（提示块、GitHub 卡片、KaTeX 公式等）见 `src/content/posts/hello-world.md` 和 `docs/README.zh-CN.md`。

## 站点配置

| 想改什么 | 改哪里 |
| --- | --- |
| 标题、副标题、语言、主题色、Banner、目录、favicon | `src/config.ts` → `siteConfig` |
| 导航栏菜单 | `src/config.ts` → `navBarConfig` |
| 左下角头像、昵称、简介、社交链接 | `src/config.ts` → `profileConfig` |
| 版权协议 | `src/config.ts` → `licenseConfig` |
| 代码块配色 | `src/config.ts` → `expressiveCodeConfig` |
| 部署域名 | `astro.config.mjs` → `site` |
| 关于页内容 | `src/content/spec/about.md` |

头像和 Banner 用的还是主题自带的示例图，建议换成自己的：

- `src/assets/images/demo-avatar.png`（头像）
- `src/assets/images/demo-banner.png`（顶部横幅）

## 部署

推送到 `main` 即自动部署，约 1 分钟：

```sh
git add -A
git commit -m "新文章"
git push
```

### 踩过的坑：不要在 withastro/action 里写 package-manager

`withastro/action` 的 `action.yml` 有逻辑缺陷：**一旦显式传入 `package-manager` 参数，它就不会设置 `LOCKFILE` 环境变量**，随后 `actions/setup-node` 的 `cache-dependency-path` 变成空值，构建在第 3 个 step 就报错（整个 job 十几秒就失败）。

所以 `.github/workflows/deploy.yml` 里只写了 `node-version`，让 action 自己扫描到 `pnpm-lock.yaml`（这样 `PACKAGE_MANAGER` 和 `LOCKFILE` 都会被设上）。pnpm 的版本由 `package.json` 的 `packageManager` 字段（`pnpm@9.14.4`）决定。

## 网络说明（重要）

这台机器上 `github.com:443` **不通**（连接被重置），但 `ssh.github.com:443` 和 `api.github.com` 可以访问，所以 git 远程走的是 SSH over 443。

`C:\Users\suzirui\.ssh\config`：

```
Host github.com
    HostName ssh.github.com
    Port 443
    User git
    IdentityFile ~/.ssh/id_ed25519
    IdentitiesOnly yes
```

- **不要用 HTTPS 地址推送**（`https://github.com/...`），会 timeout
- 验证：`ssh -T git@github.com` → `Hi windowshappy! You've successfully authenticated`
- 另外 `git clone github.com/xxx` 同样不通；下载主题/源码可用 tarball 通道：`https://codeload.github.com/<owner>/<repo>/tar.gz/refs/heads/main`

## 分支说明

| 分支 | 内容 |
| --- | --- |
| `main` | 当前站点（Fuwari 主题） |
| `astro-blog-template` | 之前的 Astro 官方 blog 模板版本（Bear Blog 风格） |
| `legacy-hexo` | 2022 年的旧 Hexo 站点（21 个提交） |

## 目录结构

```text
├── .github/workflows/deploy.yml   # GitHub Pages 自动部署
├── docs/                          # Fuwari 主题文档（含中文）
├── public/                        # 静态资源（favicon 等）
├── scripts/new-post.js            # 新建文章脚本
├── src/
│   ├── assets/images/             # 头像、Banner
│   ├── components/                # 组件（Svelte + Astro）
│   ├── content/posts/             # 博客文章
│   ├── content/spec/about.md      # 关于页
│   ├── i18n/                      # 多语言文案
│   ├── layouts/
│   ├── pages/
│   ├── plugins/                   # markdown / 代码块插件
│   ├── styles/
│   ├── config.ts                  # 站点配置（最常改）
│   └── types/
├── astro.config.mjs
└── package.json
```

## 许可

主题 [Fuwari](https://github.com/saicaca/fuwari) 以 MIT 协议发布，见 `LICENSE`。
