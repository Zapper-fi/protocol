// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion
import type { Config } from "@docusaurus/types";
import { themes as prismThemes } from "prism-react-renderer";

const config = {
	title:
		"An open protocol that incentivizes the interpretation and distribution of human-readable onchain information.",
	plugins: [
		"docusaurus-plugin-sass",
		[
			"docusaurus-plugin-remote-content",
			{
				// options here
				name: "studio-changelog",
				sourceBaseUrl:
					"https://raw.githubusercontent.com/Zapper-fi/studio/main/",
				outDir: "docs", // the base directory to output to.
				documents: ["CHANGELOG.md"], // the file names to download
			},
		],
	],
	tagline: "Illuminating the onchain world for everyone.",

	url: "https://protocol.zapper.xyz",
	baseUrl: "/",
	onBrokenLinks: "warn",
	onBrokenMarkdownLinks: "warn",
	favicon: "img/favicon.ico",
	organizationName: "Zap Protocol",
	projectName: "Zap Protocol Website",
	presets: [
		[
			"classic",
			/** @type {import('@docusaurus/preset-classic').Options} */
			({
				docs: {
					sidebarPath: require.resolve("./sidebars.js"),
					editUrl: "https://github.com/Zapper-fi/protocol/tree/main/",
				},
				theme: {
					customCss: require.resolve("./src/scss/custom.scss"),
				},
			}),
		],
	],

	themeConfig:
		/** @type {import('@docusaurus/preset-classic').ThemeConfig} */
		({
			navbar: {
				title: "Zap Protocol",
				logo: {
					alt: "Zapper Logo",
					src: "img/logo.png",
				},
				items: [
					{
						position: "left",
						label: "Interpretation Docs",
						to: "docs/interpretation",
						activeBaseRegex: "docs/interpretation",
					},
					{
						position: "left",
						label: "Indexer Docs",
						to: "docs/interpretation",
						activeBaseRegex: "docs/interpretation",
					},
					{
						position: "left",
						label: "Consumer API",
						to: "docs/interpretation",
						activeBaseRegex: "docs/interpretation",
					},
					{
						href: "https://github.com/Zapper-fi/studio",
						label: "GitHub",
						position: "right",
					},
				],
			},
			footer: {
				links: [
					{
						title: "Community",
						items: [
							{
								label: "Twitter",
								href: "https://twitter.com/zapper_fi",
							},
							{
								label: "Discord",
								href: "https://zapper.xyz/discord",
							},
						],
					},
					{
						title: "More",
						items: [
							{
								label: "GitHub",
								href: "https://github.com/Zapper-fi/studio",
							},
						],
					},
				],
			},
			prism: {
				theme: prismThemes.github,
				darkTheme: prismThemes.dracula,
			},
		}),
} satisfies Config;

export default config;
