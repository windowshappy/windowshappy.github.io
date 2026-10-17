import type { AUTO_MODE, DARK_MODE, LIGHT_MODE } from "@constants/constants";

export type SiteConfig = {
	title: string;
	subtitle: string;

	lang:
		| "en"
		| "zh_CN"
		| "zh_TW"
		| "ja"
		| "ko"
		| "es"
		| "th"
		| "vi"
		| "tr"
		| "id";

	themeColor: {
		hue: number;
		fixed: boolean;
	};
	banner: {
		enable: boolean;
		src: string;
		position?: "top" | "center" | "bottom";
		credit: {
			enable: boolean;
			text: string;
			url?: string;
		};
	};
	toc: {
		enable: boolean;
		depth: 1 | 2 | 3;
	};

	favicon: Favicon[];
};

export type Favicon = {
	src: string;
	theme?: "light" | "dark";
	sizes?: string;
};

export enum LinkPreset {
	Home = 0,
	Archive = 1,
	About = 2,
}

export type NavBarLink = {
	name: string;
	url: string;
	external?: boolean;
};

export type NavBarConfig = {
	links: (NavBarLink | LinkPreset)[];
};

export type ProfileConfig = {
	avatar?: string;
	name: string;
	bio?: string;
	links: {
		name: string;
		url: string;
		icon: string;
	}[];
};

export type LicenseConfig = {
	enable: boolean;
	name: string;
	url: string;
};

export type LIGHT_DARK_MODE =
	| typeof LIGHT_MODE
	| typeof DARK_MODE
	| typeof AUTO_MODE;

export type BlogPostData = {
	body: string;
	title: string;
	published: Date;
	description: string;
	tags: string[];
	draft?: boolean;
	image?: string;
	category?: string;
	prevTitle?: string;
	prevSlug?: string;
	nextTitle?: string;
	nextSlug?: string;
};

export type ExpressiveCodeConfig = {
	theme: string;
};

export type GiscusConfig = {
	repo: string; // GitHub 仓库，格式 owner/repo
	repoId: string; // 仓库的 node_id，见 https://giscus.app 配置页
	category: string; // Discussions 分类名称
	categoryId: string; // 分类的 node_id
	mapping: "pathname" | "url" | "title" | "og:title" | "specific" | "number";
	strict: boolean; // 严格匹配模式
	reactionsEnabled: boolean; // 允许点 emoji 反应
	emitMetadata: boolean; // 向父页面发送 discussion 元数据
	inputPosition: "top" | "bottom"; // 评论输入框位置
	lang: string; // 界面语言，如 zh-CN
	loading: "lazy" | "eager";
};

export type CommentConfig = {
	enable: boolean;
	giscus: GiscusConfig;
};

export type UmamiConfig = {
	enable: boolean;
	websiteId: string; // Umami 后台的「网站 ID」
	baseUrl: string; // 官方 Cloud 用 https://cloud.umami.is，自建实例填自己的域名
	domains?: string; // 只统计这些域名，逗号分隔（避免把 localhost 的预览数据算进去）
};

export type AnalyticsConfig = {
	umami?: UmamiConfig;
};
