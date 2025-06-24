export interface ThemeColors {
    primary: {
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
    success: string;
    warning: string;
    error: string;
    info: string;
    background: {
        primary: string;
        secondary: string;
        elevated: string;
    };
    text: {
        primary: string;
        secondary: string;
        disabled: string;
        inverse: string;
    };
    border: {
        light: string;
        medium: string;
        heavy: string;
    };
}
export interface ThemeSpacing {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
    xxxl: string;
}
export interface ThemeTypography {
    fontFamily: {
        sans: string;
        mono: string;
    };
    fontSize: {
        xs: string;
        sm: string;
        base: string;
        lg: string;
        xl: string;
        '2xl': string;
        '3xl': string;
        '4xl': string;
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
//# sourceMappingURL=types.d.ts.map