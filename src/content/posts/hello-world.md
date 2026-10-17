---
title: 你好，世界
published: 2026-10-17
description: 博客正式上线，介绍一下这个站点和它的技术栈。
tags: [随笔, Astro]
category: 随笔
draft: false
---

博客正式上线了 🎉

## 关于这个站点

- **框架**：[Astro](https://astro.build)，输出纯静态文件，加载快、SEO 友好
- **主题**：[Fuwari](https://github.com/saicaca/fuwari)，卡片式布局，自带暗色模式与主题色切换
- **部署**：推送到 `main` 后由 GitHub Actions 自动构建并发布到 GitHub Pages
- **搜索**：基于 [Pagefind](https://pagefind.app/) 的全文搜索，纯静态、无后端

## 写文章的格式

文章放在 `src/content/posts/` 目录下，文件名就是 URL 路径：

```yaml
---
title: 文章标题
published: 2026-10-17
description: 一句话摘要，会显示在列表和搜索结果里
image: ''
tags: [标签一, 标签二]
category: 分类
draft: false
---
```

## 主题自带的一些排版能力

代码块带行号和高亮：

```ts
const greet = (name: string): string => {
	return `你好，${name}！`;
};
```

数学公式（KaTeX）：

$$
E = mc^2
$$

提示块：

:::note
这是一个 note 提示块。
:::

:::tip
这是一个 tip 提示块。
:::

:::warning
这是一个 warning 提示块。
:::

GitHub 仓库卡片：

::github{repo="withastro/astro"}

以后就在这里记录了。
