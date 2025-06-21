// packages/shared/src/components/Layout/Layout.tsx
import React, { ReactNode } from 'react';
import classNames from 'classnames';
import { useTheme } from '../../themes/context';
import styles from './Layout.module.scss';

export interface LayoutProps {
  /** 子元素 */
  children: ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 是否为流式布局 */
  fluid?: boolean;
  /** 背景色 */
  background?: 'default' | 'secondary' | 'elevated';
  /** 内边距 */
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  /** 最小高度 */
  minHeight?: string | number;
  /** 是否居中 */
  centered?: boolean;
}

const Layout: React.FC<LayoutProps> = ({
                                         children,
                                         className,
                                         fluid = false,
                                         background = 'default',
                                         padding = 'md',
                                         minHeight,
                                         centered = false,
                                         ...props
                                       }) => {
  const { theme } = useTheme();

  const layoutClasses = classNames(
    styles.layout,
    styles[`layout--${background}`],
    styles[`layout--padding-${padding}`],
    {
      [styles['layout--fluid']]: fluid,
      [styles['layout--centered']]: centered,
    },
    className
  );

  const layoutStyle: React.CSSProperties = {
    minHeight: typeof minHeight === 'number' ? `${minHeight}px` : minHeight,
  };

  return (
    <div className={layoutClasses} style={layoutStyle} {...props}>
      {children}
    </div>
  );
};

// Header 组件
export interface HeaderProps {
  children: ReactNode;
  className?: string;
  sticky?: boolean;
  bordered?: boolean;
  height?: string | number;
  background?: 'default' | 'primary' | 'transparent';
}

const Header: React.FC<HeaderProps> = ({
                                         children,
                                         className,
                                         sticky = false,
                                         bordered = true,
                                         height = 64,
                                         background = 'default',
                                         ...props
                                       }) => {
  const headerClasses = classNames(
    styles.header,
    styles[`header--${background}`],
    {
      [styles['header--sticky']]: sticky,
      [styles['header--bordered']]: bordered,
    },
    className
  );

  const headerStyle: React.CSSProperties = {
    height: typeof height === 'number' ? `${height}px` : height,
  };

  return (
    <header className={headerClasses} style={headerStyle} {...props}>
      <div className={styles.headerContent}>
        {children}
      </div>
    </header>
  );
};

// Sidebar 组件
export interface SidebarProps {
  children: ReactNode;
  className?: string;
  width?: string | number;
  collapsible?: boolean;
  collapsed?: boolean;
  onCollapse?: (collapsed: boolean) => void;
  position?: 'left' | 'right';
  background?: 'default' | 'secondary';
  bordered?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({
                                           children,
                                           className,
                                           width = 280,
                                           collapsible = false,
                                           collapsed = false,
                                           onCollapse,
                                           position = 'left',
                                           background = 'default',
                                           bordered = true,
                                           ...props
                                         }) => {
  const sidebarClasses = classNames(
    styles.sidebar,
    styles[`sidebar--${position}`],
    styles[`sidebar--${background}`],
    {
      [styles['sidebar--collapsed']]: collapsed,
      [styles['sidebar--collapsible']]: collapsible,
      [styles['sidebar--bordered']]: bordered,
    },
    className
  );

  const sidebarStyle: React.CSSProperties = {
    width: collapsed ? (collapsible ? 60 : 0) : (typeof width === 'number' ? `${width}px` : width),
  };

  return (
    <aside className={sidebarClasses} style={sidebarStyle} {...props}>
      <div className={styles.sidebarContent}>
        {children}
      </div>
    </aside>
  );
};

// Main 组件
export interface MainProps {
  children: ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  background?: 'default' | 'secondary';
}

const Main: React.FC<MainProps> = ({
                                     children,
                                     className,
                                     padding = 'md',
                                     background = 'default',
                                     ...props
                                   }) => {
  const mainClasses = classNames(
    styles.main,
    styles[`main--${background}`],
    styles[`main--padding-${padding}`],
    className
  );

  return (
    <main className={mainClasses} {...props}>
      {children}
    </main>
  );
};

// Footer 组件
export interface FooterProps {
  children: ReactNode;
  className?: string;
  sticky?: boolean;
  bordered?: boolean;
  background?: 'default' | 'secondary';
}

const Footer: React.FC<FooterProps> = ({
                                         children,
                                         className,
                                         sticky = false,
                                         bordered = true,
                                         background = 'default',
                                         ...props
                                       }) => {
  const footerClasses = classNames(
    styles.footer,
    styles[`footer--${background}`],
    {
      [styles['footer--sticky']]: sticky,
      [styles['footer--bordered']]: bordered,
    },
    className
  );

  return (
    <footer className={footerClasses} {...props}>
      <div className={styles.footerContent}>
        {children}
      </div>
    </footer>
  );
};

// Container 组件
export interface ContainerProps {
  children: ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  centered?: boolean;
}

const Container: React.FC<ContainerProps> = ({
                                               children,
                                               className,
                                               size = 'lg',
                                               padding = 'md',
                                               centered = true,
                                               ...props
                                             }) => {
  const containerClasses = classNames(
    styles.container,
    styles[`container--${size}`],
    styles[`container--padding-${padding}`],
    {
      [styles['container--centered']]: centered,
    },
    className
  );

  return (
    <div className={containerClasses} {...props}>
      {children}
    </div>
  );
};

// Grid 组件
export interface GridProps {
  children: ReactNode;
  className?: string;
  columns?: number | string;
  gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  responsive?: boolean;
}

const Grid: React.FC<GridProps> = ({
                                     children,
                                     className,
                                     columns = 12,
                                     gap = 'md',
                                     responsive = true,
                                     ...props
                                   }) => {
  const gridClasses = classNames(
    styles.grid,
    styles[`grid--gap-${gap}`],
    {
      [styles['grid--responsive']]: responsive,
    },
    className
  );

  const gridStyle: React.CSSProperties = {
    gridTemplateColumns: typeof columns === 'number'
      ? `repeat(${columns}, 1fr)`
      : columns,
  };

  return (
    <div className={gridClasses} style={gridStyle} {...props}>
      {children}
    </div>
  );
};

// GridItem 组件
export interface GridItemProps {
  children: ReactNode;
  className?: string;
  span?: number;
  offset?: number;
  order?: number;
}

const GridItem: React.FC<GridItemProps> = ({
                                             children,
                                             className,
                                             span = 1,
                                             offset = 0,
                                             order,
                                             ...props
                                           }) => {
  const gridItemClasses = classNames(
    styles.gridItem,
    className
  );

  const gridItemStyle: React.CSSProperties = {
    gridColumn: `span ${span}`,
    marginLeft: offset > 0 ? `calc(${offset} * (100% / 12))` : undefined,
    order,
  };

  return (
    <div className={gridItemClasses} style={gridItemStyle} {...props}>
      {children}
    </div>
  );
};

// 导出所有组件
export { Layout, Header, Sidebar, Main, Footer, Container, Grid, GridItem };

export default Layout;
