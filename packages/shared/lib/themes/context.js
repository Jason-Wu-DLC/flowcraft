import { jsx as _jsx } from "react/jsx-runtime";
// packages/shared/src/themes/context.tsx
import React, { createContext, useContext } from 'react';
import { defaultTheme } from './default';
const ThemeContext = createContext(undefined);
export const ThemeProvider = ({ children, theme = defaultTheme }) => {
    const [currentTheme, setCurrentTheme] = React.useState(theme);
    const value = React.useMemo(() => ({
        theme: currentTheme,
        setTheme: setCurrentTheme,
    }), [currentTheme]);
    return (_jsx(ThemeContext.Provider, { value: value, children: children }));
};
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
