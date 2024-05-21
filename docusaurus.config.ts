// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion
import type { Config } from "@docusaurus/types";
import { themes as prismThemes } from "prism-react-renderer";

const config = {
	title:
		"An open protocol that incentivizes the interpretation and distribution of human-readable onchain information.",
	plugins: ["docusaurus-plugin-sass"],
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
						to: "docs/indexing",
						activeBaseRegex: "docs/indexing",
					},
					{
						position: "left",
						label: "Consumer API",
						to: "docs/api",
						activeBaseRegex: "docs/api",
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
