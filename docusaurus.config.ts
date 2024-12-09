import type * as Preset from '@docusaurus/preset-classic';
// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion
import type { Config } from '@docusaurus/types';
import { themes as prismThemes } from 'prism-react-renderer';

const config = {
  title: 'Build onchain products with limitless data, powered by our interpretation protocol.',
  plugins: [
    'docusaurus2-dotenv',
    'docusaurus-plugin-sass',
    async function myPlugin(context, options) {
      return {
        name: 'docusaurus-tailwindcss',
        configurePostCss(postcssOptions) {
          postcssOptions.plugins.push(require('tailwindcss'));
          postcssOptions.plugins.push(require('autoprefixer'));
          return postcssOptions;
        },
      };
    },
  ],
  tagline: 'The Ultimate Onchain Data API',
  headTags: [
    {
      tagName: 'meta',
      attributes: {
        property: 'og:image',
        content: 'https://protocol.zapper.xyz/img/logo.png',
      },
    },
  ],
  url: 'https://protocol.zapper.xyz',
  baseUrl: '/',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'Zapper Protocol',
  projectName: 'Zapper Protocol Website',
  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/Zapper-fi/protocol/tree/main/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.scss'),
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    colorMode: {
      defaultMode: 'dark',
    },
    footer: {
      copyright: 'Zapper Protocol',
      links: [
        {
          position: 'left',
          label: 'Twitter',
          href: 'https://twitter.com/zapper_fi',
        },
        {
          position: 'left',
          label: 'Warpcast',
          href: 'https://warpcast.com/~/channel/zapper',
        },
        {
          position: 'left',
          label: 'Discord',
          href: 'https://zapper.xyz/discord',
        },
        {
          position: 'left',
          label: 'API Support',
          href: '/support',
        },
      ],
    },
    navbar: {
      title: 'Zapper Protocol',
      logo: {
        alt: 'Zapper Logo',
        src: 'img/logo.png',
      },
      items: [
        {
          position: 'left',
          label: 'API',
          to: '/docs/api/',
        },
        {
          position: 'left',
          label: 'Interpretation',
          to: '/docs/interpretation/overview',
        },
        {
          type: 'custom-NavbarItem',
          position: 'right',
        },
      ],
    },
    algolia: {
      appId: 'MAIGR0NEB5',
      apiKey: 'b13a9ebe7be5d19ebb034f4d4572688b',
      indexName: 'protocol-zapper',
      contextualSearch: true,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
} satisfies Config;

export default config;
