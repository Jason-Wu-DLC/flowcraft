
// packages/shared/src/themes/index.ts

// 导出主题 Context
export { ThemeProvider, useTheme } from './context';

// 导出默认主题
export { defaultTheme } from './default';

// 导出主题类型
export type {
  Theme,
  ThemeColors,
  ThemeSpacing,
  ThemeTypography,
  ThemeBorderRadius,
  ThemeShadows
} from './types';