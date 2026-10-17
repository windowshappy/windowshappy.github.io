import type {
	AnalyticsConfig,
	CommentConfig,
	ExpressiveCodeConfig,
	LicenseConfig,
	NavBarConfig,
	ProfileConfig,
	SiteConfig,
} from "./types/config";
import { LinkPreset } from "./types/config";

export const siteConfig: SiteConfig = {
	title: "windowshappy 的博客",
	subtitle: "记录代码、工具与生活。",
	lang: "zh_CN", // Language code, e.g. 'en', 'zh_CN', 'ja', etc.
	themeColor: {
		hue: 250, // Default hue for the theme color, from 0 to 360. e.g. red: 0, teal: 200, cyan: 250, pink: 345
		fixed: false, // Hide the theme color picker for visitors
	},
	banner: {
		enable: true,
		src: "assets/images/demo-banner.png", // Relative to the /src directory. Relative to the /public directory if it starts with '/'
		position: "center", // Equivalent to object-position, only supports 'top', 'center', 'bottom'. 'center' by default
		credit: {
			enable: false, // Display the credit text of the banner image
			text: "", // Credit text to be displayed
			url: "", // (Optional) URL link to the original artwork or artist's page
		},
	},
	toc: {
		enable: true, // Display the table of contents on the right side of the post
		depth: 2, // Maximum heading depth to show in the table, from 1 to 3
	},
	favicon: [
		// Leave this array empty to use the default favicon
		// {
		//   src: '/favicon/icon.png',    // Path of the favicon, relative to the /public directory
		//   theme: 'light',              // (Optional) Either 'light' or 'dark', set only if you have different favicons for light and dark mode
		//   sizes: '32x32',              // (Optional) Size of the favicon, set only if you have favicons of different sizes
		// }
	],
};

export const navBarConfig: NavBarConfig = {
	links: [
		LinkPreset.Home,
		LinkPreset.Archive,
		LinkPreset.About,
		{
			name: "GitHub",
			url: "https://github.com/windowshappy",
			external: true, // Show an external link icon and will open in a new tab
		},
	],
};

export const profileConfig: ProfileConfig = {
	avatar: "assets/images/demo-avatar.png", // Relative to the /src directory. Relative to the /public directory if it starts with '/'
	name: "windowshappy",
	bio: "记录代码、工具与生活。",
	links: [
		{
			name: "GitHub",
			icon: "fa6-brands:github",
			url: "https://github.com/windowshappy",
		},
	],
};

export const licenseConfig: LicenseConfig = {
	enable: true,
	name: "CC BY-NC-SA 4.0",
	url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
};

export const expressiveCodeConfig: ExpressiveCodeConfig = {
	// Note: Some styles (such as background color) are being overridden, see the astro.config.mjs file.
	// Please select a dark theme, as this blog theme currently only supports dark background color
	theme: "github-dark",
};

// 评论系统（giscus，基于 GitHub Discussions）
// 配置项可在 https://giscus.app/zh-CN 上生成；改完需要重新部署
export const commentConfig: CommentConfig = {
	enable: true,
	giscus: {
		repo: "windowshappy/windowshappy.github.io",
		repoId: "R_kgDOIILetg", // 仓库 node_id
		category: "Announcements", // Discussions 分类名
		categoryId: "DIC_kwDOIILets4DIrpM", // 分类 node_id
		mapping: "pathname", // 用页面路径关联 discussion
		strict: false, // 用 pathname 时建议 false，否则标题重命名后评论会错位
		reactionsEnabled: true, // 允许对文章点 emoji 反应
		emitMetadata: false,
		inputPosition: "top", // 评论框显示在评论列表上方
		lang: "zh-CN",
		loading: "lazy", // 滚动到评论区才加载
	},
};

// 访问统计（Umami，无 cookie、注重隐私）
// 官方 Cloud：https://cloud.umami.is 登录 → Settings → Websites → Add website
//   添加后复制那串 «网站 ID» 填到下面，再把 enable 改成 true
// 自建实例：把 baseUrl 换成自己的域名即可（脚本路径固定是 /script.js）
export const analyticsConfig: AnalyticsConfig = {
	umami: {
		enable: false, // 填好 websiteId 后改成 true
		websiteId: "", // 形如 xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
		baseUrl: "https://cloud.umami.is",
		domains: "windowshappy.github.io", // 只统计这个主机名（注意：不要带端口/协议，umami 是拿 location.hostname 比的）
	},
};
