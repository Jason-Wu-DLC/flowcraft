import React, { ReactNode } from 'react';
import { Theme } from './types';
interface ThemeContextValue {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}
interface ThemeProviderProps {
    children: ReactNode;
    theme?: Theme;
}
export declare const ThemeProvider: React.FC<ThemeProviderProps>;
export declare const useTheme: () => ThemeContextValue;
export {};
//# sourceMappingURL=context.d.ts.map