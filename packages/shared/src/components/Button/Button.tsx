// packages/shared/src/components/Button/Button.tsx
import React, { forwardRef, ReactNode } from 'react';
import classNames from 'classnames';
import { useTheme } from '../../themes/context';
import styles from './Button.module.scss';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'size'> {
  /** 按钮变体 */
  variant?: ButtonVariant;
  /** 按钮尺寸 */
  size?: ButtonSize;
  /** 是否为加载状态 */
  loading?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 按钮内容 */
  children: ReactNode;
  /** 左侧图标 */
  leftIcon?: ReactNode;
  /** 右侧图标 */
  rightIcon?: ReactNode;
  /** 是否为块级元素 */
  fullWidth?: boolean;
  /** 作为其他组件渲染 */
  as?: React.ElementType;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
                                                             variant = 'primary',
                                                             size = 'md',
                                                             loading = false,
                                                             disabled = false,
                                                             children,
                                                             leftIcon,
                                                             rightIcon,
                                                             fullWidth = false,
                                                             className,
                                                             as: Component,
                                                             onClick,
                                                             ...props
                                                           }, ref) => {
  const { theme } = useTheme();

  const buttonClasses = classNames(
    styles.button,
    styles[`button--${variant}`],
    styles[`button--${size}`],
    {
      [styles['button--loading']]: loading,
      [styles['button--disabled']]: disabled,
      [styles['button--full-width']]: fullWidth,
    },
    className
  );

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (loading || disabled) {
      e.preventDefault();
      return;
    }
    onClick?.(e);
  };

  const LoadingSpinner = () => (
    <div className={styles.spinner}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="32"
          strokeDashoffset="32"
        />
      </svg>
    </div>
  );

  const buttonContent = (
    <>
      {loading && <LoadingSpinner />}
      {!loading && leftIcon && (
        <span className={styles.iconLeft}>{leftIcon}</span>
      )}
      <span className={styles.content}>{children}</span>
      {!loading && rightIcon && (
        <span className={styles.iconRight}>{rightIcon}</span>
      )}
    </>
  );

  // 如果指定了 as 属性，使用该组件（如 Link）
  if (Component) {
    return (
      <Component
        ref={ref}
        className={buttonClasses}
        onClick={handleClick}
        {...props}
      >
        {buttonContent}
      </Component>
    );
  }

  // 默认使用普通 button
  return (
    <button
      ref={ref}
      className={buttonClasses}
      disabled={disabled || loading}
      onClick={handleClick}
      {...props}
    >
      {buttonContent}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;