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
| 评论系统 | `src/config.ts` → `commentConfig` |
| 部署域名 | `astro.config.mjs` → `site` |
| 关于页内容 | `src/content/spec/about.md` |

头像和 Banner 用的还是主题自带的示例图，建议换成自己的：

- `src/assets/images/demo-avatar.png`（头像）
- `src/assets/images/demo-banner.png`（顶部横幅）

## 评论系统（giscus）

文章底部用 [giscus](https://giscus.app/zh-CN) 做评论。评论数据以 **GitHub Discussions** 的形式存在你自己的仓库里，零后端、零费用、无广告；访客需要用 GitHub 账号登录后才能评论。

不想用评论了：把 `src/config.ts` → `commentConfig.enable` 改成 `false` 即可（组件会完全不出现在页面上）。

配置项都在 `src/config.ts` → `commentConfig.giscus`：

| 字段 | 说明 |
| --- | --- |
| `repo` / `repoId` | 仓库与它的 `node_id`。`repoId` 取 `https://api.github.com/repos/<owner>/<repo>` 里的 `node_id` 字段 |
| `category` / `categoryId` | Discussions 的分类名与该分类的 `node_id` |
| `mapping` | 页面与 discussion 的关联方式，默认 `pathname`（按文章路径匹配） |
| `strict` | 用 `pathname` 时保持 `false`，否则路径大小写变化会导致评论错位 |
| `lang` | 评论区界面语言，`zh-CN` |
| `loading` | `lazy` = 滚动到评论区才加载 |

**以后想换分类**，两个 ID 可以用这个公开接口查（不需要 token）：

```sh
curl "https://giscus.app/api/discussions/categories?repo=windowshappy/windowshappy.github.io"
```

启用评论有两个前提，缺一不可：

1. 仓库 **Settings → General → Features → Discussions** 已勾选
2. 已安装 [giscus App](https://github.com/apps/giscus) 并授权本仓库（否则评论区会提示 giscus 未安装）

> 分类用的是 **Announcements**（giscus 官方推荐）：该分类只有维护者能新建讨论，可以防刷。
> 每篇文章的 discussion 在**第一次有人评论时**才自动创建。所以空评论区报 `Discussion not found` 是正常现象，登录 GitHub 后发第一条评论即可。

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

### 踩过的坑：src/styles 下的 CSS 没有显式 import

Fuwari 有个历史遗留写法：`src/styles/` 里的 `main.css`、`markdown.css` 等文件**没有被任何地方 import**，它们是被 `src/components/misc/ImageWrapper.astro` 里这句顺带拉进构建图的：

```js
// 本意只是给图片做动态导入映射，但 ../../** 实际匹配了整个 src/**
const files = import.meta.glob<ImageMetadata>("../../**", { import: "default" });
```

后果：这些 CSS 由 Vite **并发**转换，而 Tailwind 的 `@apply` 解析自定义类时，要求那个类的定义**已经先被处理过**。于是 `markdown.css` 里的 `@apply link`（`.link` 定义在 `main.css`）会**偶发**失败，报 ``The `link` class does not exist``，构建随机挂掉——加一行 CSS 或换个组件都可能触发。

已处理：把 `markdown.css` 中两处跨文件 `@apply`（`link`、`btn-regular-dark`）**展开成原生 utility**，从此没有跨文件依赖，构建稳定。

**如果以后从上游同步主题，注意别把这处改动覆盖回去。**

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
