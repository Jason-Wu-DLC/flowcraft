// packages/shared/src/index.ts
// 主入口文件
export * from './components';

// 主题相关导出 - 确保路径正确
export { ThemeProvider, useTheme } from './themes/context';
export { defaultTheme } from './themes/default';
export type {
  Theme,
  ThemeColors,
  ThemeSpacing,
  ThemeTypography,
  ThemeBorderRadius,
  ThemeShadows
} from './themes/types';

// Hooks 导出
export { useModal } from './hooks/useModal';
export type { UseModalReturn } from './hooks/useModal';

// 版本信息
export const version = '1.0.0';
