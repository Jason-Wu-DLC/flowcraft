import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@flowcraft/shared';
import { Home, PenTool, Eye, Users, Settings } from 'lucide-react';
import styles from './Navigation.module.scss';
const Navigation = () => {
    const location = useLocation();
    const navItems = [
        { path: '/', label: '首页', icon: _jsx(Home, { size: 18 }) },
        { path: '/designer', label: '设计器', icon: _jsx(PenTool, { size: 18 }) },
        { path: '/preview', label: '预览', icon: _jsx(Eye, { size: 18 }) },
        { path: '/collaboration', label: '协作', icon: _jsx(Users, { size: 18 }) },
    ];
    const isActive = (path) => {
        if (path === '/') {
            return location.pathname === '/';
        }
        return location.pathname.startsWith(path);
    };
    return (_jsxs("div", { className: styles.navigation, children: [_jsx("div", { className: styles.brand, children: _jsxs(Link, { to: "/", className: styles.brandLink, children: [_jsx("div", { className: styles.logo, children: "FC" }), _jsx("span", { className: styles.brandText, children: "FlowCraft" })] }) }), _jsx("nav", { className: styles.nav, children: navItems.map((item) => (_jsxs(Link, { to: item.path, className: `${styles.navLink} ${isActive(item.path) ? styles.active : ''}`, children: [item.icon, _jsx("span", { children: item.label })] }, item.path))) }), _jsxs("div", { className: styles.actions, children: [_jsx(Button, { variant: "ghost", size: "sm", children: _jsx(Settings, { size: 18 }) }), _jsx(Button, { variant: "outline", size: "sm", children: "\u767B\u5F55" }), _jsx(Button, { variant: "primary", size: "sm", children: "\u6CE8\u518C" })] })] }));
};
export default Navigation;
