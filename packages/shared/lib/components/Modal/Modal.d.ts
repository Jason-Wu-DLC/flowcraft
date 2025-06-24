import React, { ReactNode } from 'react';
export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';
export interface ModalProps {
    /** 是否显示模态框 */
    isOpen: boolean;
    /** 关闭回调 */
    onClose: () => void;
    /** 模态框标题 */
    title?: ReactNode;
    /** 模态框内容 */
    children: ReactNode;
    /** 模态框尺寸 */
    size?: ModalSize;
    /** 是否显示关闭按钮 */
    showCloseButton?: boolean;
    /** 是否可以通过点击背景关闭 */
    closeOnOverlayClick?: boolean;
    /** 是否可以通过 ESC 键关闭 */
    closeOnEscape?: boolean;
    /** 是否显示底部操作区 */
    showFooter?: boolean;
    /** 确认按钮文本 */
    confirmText?: string;
    /** 取消按钮文本 */
    cancelText?: string;
    /** 确认按钮加载状态 */
    confirmLoading?: boolean;
    /** 确认按钮点击回调 */
    onConfirm?: () => void | Promise<void>;
    /** 取消按钮点击回调 */
    onCancel?: () => void;
    /** 自定义页脚 */
    footer?: ReactNode;
    /** 是否居中显示 */
    centered?: boolean;
    /** 自定义容器 */
    container?: HTMLElement;
    /** 层级 */
    zIndex?: number;
    /** 自定义类名 */
    className?: string;
    /** 头部自定义类名 */
    headerClassName?: string;
    /** 内容自定义类名 */
    bodyClassName?: string;
    /** 底部自定义类名 */
    footerClassName?: string;
}
declare const Modal: React.FC<ModalProps>;
export default Modal;
//# sourceMappingURL=Modal.d.ts.map