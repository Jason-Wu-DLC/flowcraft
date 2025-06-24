// packages/shell/src/themes/context.tsx
import React, { createContext, useContext, ReactNode } from 'react';

interface Theme {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
  };
}

const defaultTheme: Theme = {
  name: 'default',
  colors: {
    primary: '#3b82f6',
    secondary: '#6b7280',
    background: '#ffffff',
    text: '#111827',
  },
};

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