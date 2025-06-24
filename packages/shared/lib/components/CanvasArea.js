import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// packages/designer/src/components/CanvasArea.tsx
import { useRef, useEffect } from 'react';
import { useDesigner } from '../contexts/DesignerContext';
import styles from './CanvasArea.module.scss';
const CanvasArea = () => {
    const canvasRef = useRef(null);
    const { state, actions } = useDesigner();
    useEffect(() => {
        if (!canvasRef.current)
            return;
        const canvas = canvasRef.current;
        const handleDragOver = (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'copy';
        };
        const handleDrop = (e) => {
            e.preventDefault();
            const componentId = e.dataTransfer.getData('text/plain');
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            actions.addComponent(componentId, { x, y });
        };
        canvas.addEventListener('dragover', handleDragOver);
        canvas.addEventListener('drop', handleDrop);
        return () => {
            canvas.removeEventListener('dragover', handleDragOver);
            canvas.removeEventListener('drop', handleDrop);
        };
    }, [actions]);
    return (_jsx("div", { className: styles.canvasArea, children: _jsx("div", { className: styles.canvasContainer, children: _jsxs("div", { ref: canvasRef, className: styles.canvas, style: {
                    transform: `scale(${state.zoom})`,
                    transformOrigin: 'top left',
                }, children: [_jsx("div", { className: styles.grid }), state.components.map((component) => (_jsxs("div", { className: `${styles.canvasComponent} ${state.selectedComponents.includes(component.id)
                            ? styles.selected
                            : ''}`, style: {
                            left: component.x,
                            top: component.y,
                            width: component.width,
                            height: component.height,
                        }, onClick: () => actions.selectComponent(component.id), children: [_jsx("div", { className: styles.componentContent, children: component.type }), state.selectedComponents.includes(component.id) && (_jsxs("div", { className: styles.selectionHandles, children: [_jsx("div", { className: styles.handle, "data-position": "nw" }), _jsx("div", { className: styles.handle, "data-position": "ne" }), _jsx("div", { className: styles.handle, "data-position": "sw" }), _jsx("div", { className: styles.handle, "data-position": "se" })] }))] }, component.id))), state.components.length === 0 && (_jsxs("div", { className: styles.emptyState, children: [_jsx("h3", { children: "\u5F00\u59CB\u8BBE\u8BA1\u4F60\u7684\u6D41\u7A0B" }), _jsx("p", { children: "\u4ECE\u5DE6\u4FA7\u7EC4\u4EF6\u5E93\u62D6\u62FD\u7EC4\u4EF6\u5230\u753B\u5E03\u5F00\u59CB\u8BBE\u8BA1" })] }))] }) }) }));
};
export default CanvasArea;
