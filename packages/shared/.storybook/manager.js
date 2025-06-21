import { addons } from 'storybook/manager-api';
import { themes } from 'storybook/theming';

addons.setConfig({
  theme: {
    ...themes.light,
    brandTitle: 'FlowCraft Design System',
    brandUrl: 'https://flowcraft.dev',
    colorPrimary: '#3b82f6',
    colorSecondary: '#6366f1',

    // UI
    appBg: '#ffffff',
    appContentBg: '#ffffff',
    appBorderColor: '#e5e7eb',
    appBorderRadius: 6,

    // Typography
    fontBase: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontCode: 'SFMono-Regular, Menlo, Monaco, Consolas, monospace',

    // Text colors
    textColor: '#111827',
    textInverseColor: '#ffffff',

    // Toolbar default and active colors
    barTextColor: '#6b7280',
    barSelectedColor: '#3b82f6',
    barBg: '#ffffff',

    // Form colors
    inputBg: '#ffffff',
    inputBorder: '#e5e7eb',
    inputTextColor: '#111827',
    inputBorderRadius: 6,
  },

});