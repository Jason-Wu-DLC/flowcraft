import React, { ReactNode } from 'react';
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
declare const Layout: React.FC<LayoutProps>;
export interface HeaderProps {
    children: ReactNode;
    className?: string;
    sticky?: boolean;
    bordered?: boolean;
    height?: string | number;
    background?: 'default' | 'primary' | 'transparent';
}
declare const Header: React.FC<HeaderProps>;
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
declare const Sidebar: React.FC<SidebarProps>;
export interface MainProps {
    children: ReactNode;
    className?: string;
    padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
    background?: 'default' | 'secondary';
}
declare const Main: React.FC<MainProps>;
export interface FooterProps {
    children: ReactNode;
    className?: string;
    sticky?: boolean;
    bordered?: boolean;
    background?: 'default' | 'secondary';
}
declare const Footer: React.FC<FooterProps>;
export interface ContainerProps {
    children: ReactNode;
    className?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
    padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
    centered?: boolean;
}
declare const Container: React.FC<ContainerProps>;
export interface GridProps {
    children: ReactNode;
    className?: string;
    columns?: number | string;
    gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
    responsive?: boolean;
}
declare const Grid: React.FC<GridProps>;
export interface GridItemProps {
    children: ReactNode;
    className?: string;
    span?: number;
    offset?: number;
    order?: number;
}
declare const GridItem: React.FC<GridItemProps>;
export { Layout, Header, Sidebar, Main, Footer, Container, Grid, GridItem };
export default Layout;
//# sourceMappingURL=Layout.d.ts.map