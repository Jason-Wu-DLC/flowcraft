import { jsx as _jsx } from "react/jsx-runtime";
import classNames from 'classnames';
import { useTheme } from '../../themes/context';
import styles from './Layout.module.scss';
const Layout = ({ children, className, fluid = false, background = 'default', padding = 'md', minHeight, centered = false, ...props }) => {
    const { theme } = useTheme();
    const layoutClasses = classNames(styles.layout, styles[`layout--${background}`], styles[`layout--padding-${padding}`], {
        [styles['layout--fluid']]: fluid,
        [styles['layout--centered']]: centered,
    }, className);
    const layoutStyle = {
        minHeight: typeof minHeight === 'number' ? `${minHeight}px` : minHeight,
    };
    return (_jsx("div", { className: layoutClasses, style: layoutStyle, ...props, children: children }));
};
const Header = ({ children, className, sticky = false, bordered = true, height = 64, background = 'default', ...props }) => {
    const headerClasses = classNames(styles.header, styles[`header--${background}`], {
        [styles['header--sticky']]: sticky,
        [styles['header--bordered']]: bordered,
    }, className);
    const headerStyle = {
        height: typeof height === 'number' ? `${height}px` : height,
    };
    return (_jsx("header", { className: headerClasses, style: headerStyle, ...props, children: _jsx("div", { className: styles.headerContent, children: children }) }));
};
const Sidebar = ({ children, className, width = 280, collapsible = false, collapsed = false, onCollapse, position = 'left', background = 'default', bordered = true, ...props }) => {
    const sidebarClasses = classNames(styles.sidebar, styles[`sidebar--${position}`], styles[`sidebar--${background}`], {
        [styles['sidebar--collapsed']]: collapsed,
        [styles['sidebar--collapsible']]: collapsible,
        [styles['sidebar--bordered']]: bordered,
    }, className);
    const sidebarStyle = {
        width: collapsed ? (collapsible ? 60 : 0) : (typeof width === 'number' ? `${width}px` : width),
    };
    return (_jsx("aside", { className: sidebarClasses, style: sidebarStyle, ...props, children: _jsx("div", { className: styles.sidebarContent, children: children }) }));
};
const Main = ({ children, className, padding = 'md', background = 'default', ...props }) => {
    const mainClasses = classNames(styles.main, styles[`main--${background}`], styles[`main--padding-${padding}`], className);
    return (_jsx("main", { className: mainClasses, ...props, children: children }));
};
const Footer = ({ children, className, sticky = false, bordered = true, background = 'default', ...props }) => {
    const footerClasses = classNames(styles.footer, styles[`footer--${background}`], {
        [styles['footer--sticky']]: sticky,
        [styles['footer--bordered']]: bordered,
    }, className);
    return (_jsx("footer", { className: footerClasses, ...props, children: _jsx("div", { className: styles.footerContent, children: children }) }));
};
const Container = ({ children, className, size = 'lg', padding = 'md', centered = true, ...props }) => {
    const containerClasses = classNames(styles.container, styles[`container--${size}`], styles[`container--padding-${padding}`], {
        [styles['container--centered']]: centered,
    }, className);
    return (_jsx("div", { className: containerClasses, ...props, children: children }));
};
const Grid = ({ children, className, columns = 12, gap = 'md', responsive = true, ...props }) => {
    const gridClasses = classNames(styles.grid, styles[`grid--gap-${gap}`], {
        [styles['grid--responsive']]: responsive,
    }, className);
    const gridStyle = {
        gridTemplateColumns: typeof columns === 'number'
            ? `repeat(${columns}, 1fr)`
            : columns,
    };
    return (_jsx("div", { className: gridClasses, style: gridStyle, ...props, children: children }));
};
const GridItem = ({ children, className, span = 1, offset = 0, order, ...props }) => {
    const gridItemClasses = classNames(styles.gridItem, className);
    const gridItemStyle = {
        gridColumn: `span ${span}`,
        marginLeft: offset > 0 ? `calc(${offset} * (100% / 12))` : undefined,
        order,
    };
    return (_jsx("div", { className: gridItemClasses, style: gridItemStyle, ...props, children: children }));
};
// 导出所有组件
export { Layout, Header, Sidebar, Main, Footer, Container, Grid, GridItem };
export default Layout;
