// packages/shared/src/themes/types.ts
export interface ThemeColors {
  // 主色系
  primary: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;  // 主色
    600: string;
    700: string;
    800: string;
    900: string;
  };

  // 辅助色系
  secondary: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  };

  // 中性色
  gray: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  };

  // 语义化颜色
  success: string;
  warning: string;
  error: string;
  info: string;

  // 背景色
  background: {
    primary: string;
    secondary: string;
    elevated: string;
  };

  // 文本色
  text: {
    primary: string;
    secondary: string;
    disabled: string;
    inverse: string;
  };

  // 边框色
  border: {
    light: string;
    medium: string;
    heavy: string;
  };
}

export interface ThemeSpacing {
  xs: string;    // 4px
  sm: string;    // 8px
  md: string;    // 16px
  lg: string;    // 24px
  xl: string;    // 32px
  xxl: string;   // 48px
  xxxl: string;  // 64px
}

export interface ThemeTypography {
  fontFamily: {
    sans: string;
    mono: string;
  };
  fontSize: {
    xs: string;    // 12px
    sm: string;    // 14px
    base: string;  // 16px
    lg: string;    // 18px
    xl: string;    // 20px
    '2xl': string; // 24px
    '3xl': string; // 30px
    '4xl': string; // 36px
  };
  fontWeight: {
    light: number;
    normal: number;
    medium: number;
    semibold: number;
    bold: number;
  };
  lineHeight: {
    tight: number;
    normal: number;
    relaxed: number;
  };
}

export interface ThemeBorderRadius {
  none: string;
  sm: string;
  base: string;
  md: string;
  lg: string;
  xl: string;
  full: string;
}

export interface ThemeShadows {
  sm: string;
  base: string;
  md: string;
  lg: string;
  xl: string;
  inner: string;
}

export interface Theme {
  name: string;
  colors: ThemeColors;
  spacing: ThemeSpacing;
  typography: ThemeTypography;
  borderRadius: ThemeBorderRadius;
  shadows: ThemeShadows;
  zIndex: {
    dropdown: number;
    modal: number;
    popover: number;
    tooltip: number;
    toast: number;
  };
  breakpoints: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
  };
}

