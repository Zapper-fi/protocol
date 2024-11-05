import type * as Preset from '@docusaurus/preset-classic';
// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion
import type { Config } from '@docusaurus/types';
import { themes as prismThemes } from 'prism-react-renderer';

const config = {
  title: 'An open protocol that incentivizes the interpretation and contextualization of onchain information.',
  plugins: [
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
  tagline: 'Illuminating the Onchain World.',
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
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'Zapper Protocol',
  projectName: 'Zapper Protocol Website',
  themes: ['@docusaurus/theme-mermaid'],
  markdown: {
    mermaid: true,
  },
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
          label: 'Discord',
          href: 'https://zapper.xyz/discord',
        },
        {
          position: 'left',
          label: 'Twitter',
          href: 'https://twitter.com/zapper_fi',
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
          label: 'Interpretation Docs',
          to: 'docs/interpretation/overview',
          activeBaseRegex: 'docs/interpretation/overview',
        },
        {
          position: 'left',
          label: 'Litepaper',
          to: 'docs/litepaper',
          activeBaseRegex: 'docs/litepaper',
        },
        {
          position: 'left',
          label: 'API',
          to: 'docs/api-intro',
          activeBaseRegex: 'docs/api-intro',
        },
        {
          position: 'left',
          label: 'Dashboard',
          to: 'dashboard',
          activeBaseRegex: 'dashboard',
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
