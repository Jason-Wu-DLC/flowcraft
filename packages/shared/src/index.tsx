export { default as Button } from './components/Button';
export type { ButtonProps, ButtonVariant, ButtonSize } from './components/Button';

export { default as Input } from './components/Input';
export type { InputProps, InputSize, InputVariant, InputStatus } from './components/Input';

export { default as Modal } from './components/Modal';
export type { ModalProps, ModalSize } from './components/Modal';

export {
  Layout,
  Header,
  Sidebar,
  Main,
  Footer,
  Container,
  Grid,
  GridItem,
} from './components/Layout';
export type {
  LayoutProps,
  HeaderProps,
  SidebarProps,
  MainProps,
  FooterProps,
  ContainerProps,
  GridProps,
  GridItemProps,
} from './components/Layout';

// 主题系统导出
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

// Hook 导出
export { default as useLocalStorage } from './hooks/useLocalStorage';
export { useModal } from './hooks/useModal';
export type { UseModalReturn } from './hooks/useModal';

// 全局样式
import './styles/global.scss';