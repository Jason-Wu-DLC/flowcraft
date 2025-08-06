// packages/shared/src/components/index.ts
// 只导出组件，避免循环依赖

export { default as Button } from './Button';
export type { ButtonProps, ButtonVariant, ButtonSize } from './Button';

export { default as Input } from './Input';
export type { InputProps, InputSize, InputVariant, InputStatus } from './Input';

export { default as Modal } from './Modal';
export type { ModalProps, ModalSize } from './Modal';

export {
  Layout,
  Header,
  Sidebar,
  Main,
  Footer,
  Container,
  Grid,
  GridItem,
} from './Layout';
export type {
  LayoutProps,
  HeaderProps,
  SidebarProps,
  MainProps,
  FooterProps,
  ContainerProps,
  GridProps,
  GridItemProps,
} from './Layout';

export { default as Textarea } from './Textarea';