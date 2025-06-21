// packages/shared/src/components/Modal/Modal.tsx
import React, { useEffect, useCallback, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import classNames from 'classnames';
import { useTheme } from '../../themes/context';
import Button from '../Button';
import styles from './Modal.module.scss';

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

const Modal: React.FC<ModalProps> = ({
                                       isOpen,
                                       onClose,
                                       title,
                                       children,
                                       size = 'md',
                                       showCloseButton = true,
                                       closeOnOverlayClick = true,
                                       closeOnEscape = true,
                                       showFooter = false,
                                       confirmText = '确认',
                                       cancelText = '取消',
                                       confirmLoading = false,
                                       onConfirm,
                                       onCancel,
                                       footer,
                                       centered = true,
                                       container,
                                       zIndex = 1050,
                                       className,
                                       headerClassName,
                                       bodyClassName,
                                       footerClassName,
                                     }) => {
  const { theme } = useTheme();

  // 获取挂载容器
  const getContainer = useCallback(() => {
    return container || document.body;
  }, [container]);

  // ESC 键关闭
  useEffect(() => {
    if (!isOpen || !closeOnEscape) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeOnEscape, onClose]);

  // 禁止页面滚动
  useEffect(() => {
    if (!isOpen) return;

    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [isOpen]);

  // 背景点击关闭
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && closeOnOverlayClick) {
      onClose();
    }
  };

  // 确认处理
  const handleConfirm = async () => {
    if (onConfirm) {
      try {
        await onConfirm();
      } catch (error) {
        // 错误处理可以在这里进行
        console.error('Modal confirm error:', error);
      }
    }
  };

  // 取消处理
  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
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
  const overlayClasses = classNames(
    styles.overlay,
    {
      [styles['overlay--centered']]: centered,
    }
  );

  const modalClasses = classNames(
    styles.modal,
    styles[`modal--${size}`],
    className
  );

  const headerClasses = classNames(styles.header, headerClassName);
  const bodyClasses = classNames(styles.body, bodyClassName);
  const footerClasses = classNames(styles.footer, footerClassName);

  // 渲染头部
  const renderHeader = () => {
    if (!title && !showCloseButton) return null;

    return (
      <div className={headerClasses}>
        {title && (
          <h3 className={styles.title}>{title}</h3>
        )}
        {showCloseButton && (
          <button
            className={styles.closeButton}
            onClick={onClose}
            aria-label="关闭"
          >
            <X size={20} />
          </button>
        )}
      </div>
    );
  };

  // 渲染底部
  const renderFooter = () => {
    if (!showFooter && !footer) return null;

    if (footer) {
      return <div className={footerClasses}>{footer}</div>;
    }

    return (
      <div className={footerClasses}>
        <div className={styles.footerActions}>
          <Button
            variant="outline"
            onClick={handleCancel}
            disabled={confirmLoading}
          >
            {cancelText}
          </Button>
          <Button
            variant="primary"
            onClick={handleConfirm}
            loading={confirmLoading}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    );
  };

  // 模态框内容
  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={overlayClasses}
          style={{ zIndex }}
          onClick={handleOverlayClick}
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className={modalClasses}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3, type: 'spring', damping: 25, stiffness: 300 }}
          >
            {renderHeader()}
            <div className={bodyClasses}>{children}</div>
            {renderFooter()}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, getContainer());
};

export default Modal;