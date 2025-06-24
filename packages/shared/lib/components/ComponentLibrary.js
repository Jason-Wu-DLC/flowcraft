import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Input } from '@flowcraft/shared';
import { Search, Square, Type, Image, BarChart3, Table } from 'lucide-react';
import styles from './ComponentLibrary.module.scss';
const ComponentLibrary = () => {
    const componentGroups = [
        {
            title: '基础组件',
            components: [
                { id: 'button', name: '按钮', icon: _jsx(Square, { size: 16 }) },
                { id: 'input', name: '输入框', icon: _jsx(Type, { size: 16 }) },
                { id: 'text', name: '文本', icon: _jsx(Type, { size: 16 }) },
                { id: 'image', name: '图片', icon: _jsx(Image, { size: 16 }) },
            ],
        },
        {
            title: '布局组件',
            components: [
                { id: 'container', name: '容器', icon: _jsx(Square, { size: 16 }) },
                { id: 'row', name: '行', icon: _jsx(Square, { size: 16 }) },
                { id: 'column', name: '列', icon: _jsx(Square, { size: 16 }) },
            ],
        },
        {
            title: '数据组件',
            components: [
                { id: 'table', name: '表格', icon: _jsx(Table, { size: 16 }) },
                { id: 'chart', name: '图表', icon: _jsx(BarChart3, { size: 16 }) },
                { id: 'list', name: '列表', icon: _jsx(Square, { size: 16 }) },
            ],
        },
    ];
    const handleDragStart = (e, componentId) => {
        e.dataTransfer.setData('text/plain', componentId);
        e.dataTransfer.effectAllowed = 'copy';
    };
    return (_jsxs("div", { className: styles.componentLibrary, children: [_jsxs("div", { className: styles.libraryHeader, children: [_jsx("h3", { className: styles.libraryTitle, children: "\u7EC4\u4EF6\u5E93" }), _jsx(Input, { size: "sm", placeholder: "\u641C\u7D22\u7EC4\u4EF6...", leftIcon: _jsx(Search, { size: 14 }) })] }), _jsx("div", { className: styles.libraryContent, children: componentGroups.map((group) => (_jsxs("div", { className: styles.componentGroup, children: [_jsx("h4", { className: styles.groupTitle, children: group.title }), _jsx("div", { className: styles.componentList, children: group.components.map((component) => (_jsxs("div", { className: styles.componentItem, draggable: true, onDragStart: (e) => handleDragStart(e, component.id), children: [_jsx("div", { className: styles.componentIcon, children: component.icon }), _jsx("span", { className: styles.componentName, children: component.name })] }, component.id))) })] }, group.title))) })] }));
};
export default ComponentLibrary;
