import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from '@flowcraft/shared';
import { Undo, Redo, ZoomIn, ZoomOut, Move, Square, Circle, Type, MousePointer } from 'lucide-react';
import { useDesigner } from '../contexts/DesignerContext';
import styles from './Toolbar.module.scss';
const Toolbar = () => {
    const { state, actions } = useDesigner();
    const tools = [
        { id: 'select', icon: _jsx(MousePointer, { size: 16 }), tooltip: '选择工具' },
        { id: 'move', icon: _jsx(Move, { size: 16 }), tooltip: '移动工具' },
        { id: 'rectangle', icon: _jsx(Square, { size: 16 }), tooltip: '矩形' },
        { id: 'circle', icon: _jsx(Circle, { size: 16 }), tooltip: '圆形' },
        { id: 'text', icon: _jsx(Type, { size: 16 }), tooltip: '文本' },
    ];
    return (_jsxs("div", { className: styles.toolbar, children: [_jsxs("div", { className: styles.toolGroup, children: [_jsx(Button, { variant: "ghost", size: "sm", onClick: actions.undo, disabled: !state.canUndo, children: _jsx(Undo, { size: 16 }) }), _jsx(Button, { variant: "ghost", size: "sm", onClick: actions.redo, disabled: !state.canRedo, children: _jsx(Redo, { size: 16 }) })] }), _jsx("div", { className: styles.toolSeparator }), _jsx("div", { className: styles.toolGroup, children: tools.map((tool) => (_jsx(Button, { variant: state.activeTool === tool.id ? 'primary' : 'ghost', size: "sm", onClick: () => actions.setActiveTool(tool.id), title: tool.tooltip, children: tool.icon }, tool.id))) }), _jsx("div", { className: styles.toolSeparator }), _jsxs("div", { className: styles.toolGroup, children: [_jsx(Button, { variant: "ghost", size: "sm", onClick: actions.zoomOut, children: _jsx(ZoomOut, { size: 16 }) }), _jsxs("span", { className: styles.zoomLevel, children: [Math.round(state.zoom * 100), "%"] }), _jsx(Button, { variant: "ghost", size: "sm", onClick: actions.zoomIn, children: _jsx(ZoomIn, { size: 16 }) })] })] }));
};
export default Toolbar;
