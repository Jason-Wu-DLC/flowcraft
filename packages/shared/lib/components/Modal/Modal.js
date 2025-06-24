import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// packages/shared/src/components/Modal/Modal.tsx
import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import classNames from 'classnames';
import { useTheme } from '../../themes/context';
import Button from '../Button';
import styles from './Modal.module.scss';
const Modal = ({ isOpen, onClose, title, children, size = 'md', showCloseButton = true, closeOnOverlayClick = true, closeOnEscape = true, showFooter = false, confirmText = '确认', cancelText = '取消', confirmLoading = false, onConfirm, onCancel, footer, centered = true, container, zIndex = 1050, className, headerClassName, bodyClassName, footerClassName, }) => {
    const { theme } = useTheme();
    // 获取挂载容器
    const getContainer = useCallback(() => {
        return container || document.body;
    }, [container]);
    // ESC 键关闭
    useEffect(() => {
        if (!isOpen || !closeOnEscape)
            return;
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, closeOnEscape, onClose]);
    // 禁止页面滚动
    useEffect(() => {
        if (!isOpen)
            return;
        const originalStyle = window.getComputedStyle(document.body).overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = originalStyle;
        };
    }, [isOpen]);
    // 背景点击关闭
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget && closeOnOverlayClick) {
            onClose();
        }
    };
    // 确认处理
    const handleConfirm = async () => {
        if (onConfirm) {
            try {
                await onConfirm();
            }
            catch (error) {
                // 错误处理可以在这里进行
                console.error('Modal confirm error:', error);
            }
        }
    };
    // 取消处理
    const handleCancel = () => {
        if (onCancel) {
            onCancel();
        }
        else {
            onClose();
        }
    };
    // 动画变体
    const overlayVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
        exit: { opacity: 0 },
    };
    const modalVariants = {
        hidden: {
            opacity: 0,
            scale: 0.8,
            y: centered ? 0 : -50,
        },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
        },
        exit: {
            opacity: 0,
            scale: 0.8,
            y: centered ? 0 : -50,
        },
    };
    // 样式类名
    const overlayClasses = classNames(styles.overlay, {
        [styles['overlay--centered']]: centered,
    });
    const modalClasses = classNames(styles.modal, styles[`modal--${size}`], className);
    const headerClasses = classNames(styles.header, headerClassName);
    const bodyClasses = classNames(styles.body, bodyClassName);
    const footerClasses = classNames(styles.footer, footerClassName);
    // 渲染头部
    const renderHeader = () => {
        if (!title && !showCloseButton)
            return null;
        return (_jsxs("div", { className: headerClasses, children: [title && (_jsx("h3", { className: styles.title, children: title })), showCloseButton && (_jsx("button", { className: styles.closeButton, onClick: onClose, "aria-label": "\u5173\u95ED", children: _jsx(X, { size: 20 }) }))] }));
    };
    // 渲染底部
    const renderFooter = () => {
        if (!showFooter && !footer)
            return null;
        if (footer) {
            return _jsx("div", { className: footerClasses, children: footer });
        }
        return (_jsx("div", { className: footerClasses, children: _jsxs("div", { className: styles.footerActions, children: [_jsx(Button, { variant: "outline", onClick: handleCancel, disabled: confirmLoading, children: cancelText }), _jsx(Button, { variant: "primary", onClick: handleConfirm, loading: confirmLoading, children: confirmText })] }) }));
    };
    // 模态框内容
    const modalContent = (_jsx(AnimatePresence, { children: isOpen && (_jsx(motion.div, { className: overlayClasses, style: { zIndex }, onClick: handleOverlayClick, variants: overlayVariants, initial: "hidden", animate: "visible", exit: "exit", transition: { duration: 0.2 }, children: _jsxs(motion.div, { className: modalClasses, variants: modalVariants, initial: "hidden", animate: "visible", exit: "exit", transition: { duration: 0.3, type: 'spring', damping: 25, stiffness: 300 }, children: [renderHeader(), _jsx("div", { className: bodyClasses, children: children }), renderFooter()] }) })) }));
    return createPortal(modalContent, getContainer());
};
export default Modal;
