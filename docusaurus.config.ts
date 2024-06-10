// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion
import type { Config } from "@docusaurus/types";
import { themes as prismThemes } from "prism-react-renderer";
import type * as Preset from "@docusaurus/preset-classic";

const config = {
	title:
		"An open protocol that incentivizes the interpretation and contextualization of onchain information.",
	plugins: ["docusaurus-plugin-sass"],
	tagline: "Illuminating the Onchain World.",

	url: "https://protocol.zapper.xyz",
	baseUrl: "/",
	onBrokenLinks: "warn",
	onBrokenMarkdownLinks: "warn",
	favicon: "img/favicon.ico",
	organizationName: "Zapper Protocol",
	projectName: "Zapper Protocol Website",
	presets: [
		[
			"classic",
			{
				docs: {
					sidebarPath: require.resolve("./sidebars.js"),
					editUrl: "https://github.com/Zapper-fi/protocol/tree/main/",
				},
				theme: {
					customCss: require.resolve("./src/scss/custom.scss"),
				},
			} satisfies Preset.Options,
		],
	],

	themeConfig: {
		footer: {
			links: [
				{
					label: "Discord",
					href: "https://zapper.xyz/discord",
				},
				{
					label: "Twitter",
					href: "https://twitter.com/zapper_fi",
				},
			],
		},
		navbar: {
			title: "Zapper Protocol",
			logo: {
				alt: "Zapper Logo",
				src: "img/logo.png",
			},
			items: [
				{
					position: "left",
					label: "Interpretation Docs",
					to: "docs/interpretation/overview",
					activeBaseRegex: "docs/interpretation/overview",
				},
				{
					position: "left",
					label: "API",
					to: "docs/api/intro",
					activeBaseRegex: "docs/api/into",
				},
			],
		},

		prism: {
			theme: prismThemes.github,
			darkTheme: prismThemes.dracula,
		},
	} satisfies Preset.ThemeConfig,
} satisfies Config;

export default config;
