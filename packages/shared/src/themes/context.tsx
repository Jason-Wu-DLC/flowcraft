// packages/shared/src/themes/context.tsx
import React, { createContext, useContext, ReactNode } from 'react';
import { Theme } from './types';
import { defaultTheme } from './default';

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  theme?: Theme;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
                                                              children,
                                                              theme = defaultTheme
                                                            }) => {
  const [currentTheme, setCurrentTheme] = React.useState(theme);

  const value = React.useMemo(() => ({
    theme: currentTheme,
    setTheme: setCurrentTheme,
  }), [currentTheme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};