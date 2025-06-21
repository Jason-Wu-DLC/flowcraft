// packages/shared/src/components/Input/Input.tsx
import React, { forwardRef, useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import classNames from 'classnames';
import { Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';
import { useTheme } from '../../themes/context';
import styles from './Input.module.scss';

export type InputSize = 'sm' | 'md' | 'lg';
export type InputVariant = 'default' | 'filled' | 'flushed';
export type InputStatus = 'default' | 'error' | 'success' | 'warning';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** 输入框尺寸 */
  size?: InputSize;
  /** 输入框变体 */
  variant?: InputVariant;
  /** 输入框状态 */
  status?: InputStatus;
  /** 标签文本 */
  label?: string;
  /** 占位符文本 */
  placeholder?: string;
  /** 帮助文本 */
  helperText?: string;
  /** 错误信息 */
  errorMessage?: string;
  /** 成功信息 */
  successMessage?: string;
  /** 是否必填 */
  required?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否只读 */
  readOnly?: boolean;
  /** 左侧图标 */
  leftIcon?: ReactNode;
  /** 右侧图标 */
  rightIcon?: ReactNode;
  /** 左侧插槽 */
  leftAddon?: ReactNode;
  /** 右侧插槽 */
  rightAddon?: ReactNode;
  /** 是否显示字符计数 */
  showCount?: boolean;
  /** 最大字符数 */
  maxLength?: number;
  /** 是否可清除 */
  clearable?: boolean;
  /** 清除回调 */
  onClear?: () => void;
  /** 值变化回调 */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
                                                          size = 'md',
                                                          variant = 'default',
                                                          status = 'default',
                                                          label,
                                                          placeholder,
                                                          helperText,
                                                          errorMessage,
                                                          successMessage,
                                                          required = false,
                                                          disabled = false,
                                                          readOnly = false,
                                                          leftIcon,
                                                          rightIcon,
                                                          leftAddon,
                                                          rightAddon,
                                                          showCount = false,
                                                          maxLength,
                                                          clearable = false,
                                                          onClear,
                                                          onChange,
                                                          className,
                                                          type = 'text',
                                                          value = '',
                                                          ...props
                                                        }, ref) => {
  const { theme } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // 处理密码类型
  const isPasswordType = type === 'password';
  const inputType = isPasswordType && showPassword ? 'text' : type;

  // 计算实际状态
  const actualStatus = errorMessage ? 'error' : successMessage ? 'success' : status;

  // 计算字符数
  const currentLength = String(value || '').length;
  const showCountDisplay = showCount && maxLength;

  // 样式类名
  const containerClasses = classNames(
    styles.container,
    styles[`container--${size}`],
    {
      [styles['container--focused']]: isFocused,
      [styles['container--disabled']]: disabled,
      [styles['container--readonly']]: readOnly,
      [styles['container--error']]: actualStatus === 'error',
      [styles['container--success']]: actualStatus === 'success',
      [styles['container--warning']]: actualStatus === 'warning',
    },
    className
  );

  const inputClasses = classNames(
    styles.input,
    styles[`input--${variant}`],
    styles[`input--${size}`],
    {
      [styles['input--with-left-icon']]: leftIcon,
      [styles['input--with-right-icon']]: rightIcon || isPasswordType || clearable,
      [styles['input--with-left-addon']]: leftAddon,
      [styles['input--with-right-addon']]: rightAddon,
    }
  );

  // 处理输入变化
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e);
  };

  // 处理清除
  const handleClear = () => {
    onClear?.();
  };

  // 切换密码显示
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // 状态图标
  const StatusIcon = () => {
    switch (actualStatus) {
      case 'error':
        return <AlertCircle size={16} className={styles.statusIcon} />;
      case 'success':
        return <CheckCircle size={16} className={styles.statusIcon} />;
      default:
        return null;
    }
  };

  // 右侧操作图标
  const RightIcons = () => (
    <div className={styles.rightIcons}>
      {clearable && value && !disabled && !readOnly && (
        <button
          type="button"
          className={styles.clearButton}
          onClick={handleClear}
          tabIndex={-1}
        >
          ×
        </button>
      )}

      {isPasswordType && (
        <button
          type="button"
          className={styles.passwordToggle}
          onClick={togglePasswordVisibility}
          tabIndex={-1}
        >
          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      )}

      <StatusIcon />

      {rightIcon && (
        <span className={styles.rightIcon}>{rightIcon}</span>
      )}
    </div>
  );

  // 计数显示
  const CountDisplay = () => {
    if (!showCountDisplay) return null;

    return (
      <div className={styles.count}>
        <span className={currentLength > maxLength! ? styles.countError : ''}>
          {currentLength}
        </span>
        <span>/{maxLength}</span>
      </div>
    );
  };

  // 消息显示
  const MessageDisplay = () => {
    const message = errorMessage || successMessage || helperText;
    if (!message) return null;

    return (
      <AnimatePresence>
        <motion.div
          className={classNames(styles.message, {
            [styles.messageError]: errorMessage,
            [styles.messageSuccess]: successMessage,
            [styles.messageHelper]: helperText && !errorMessage && !successMessage,
          })}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
        >
          {message}
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <div className={styles.wrapper}>
      {/* 标签 */}
      {label && (
        <label className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}

      {/* 输入框容器 */}
      <div className={containerClasses}>
        {/* 左侧插槽 */}
        {leftAddon && (
          <div className={styles.leftAddon}>{leftAddon}</div>
        )}

        {/* 输入框主体 */}
        <div className={styles.inputWrapper}>
          {/* 左侧图标 */}
          {leftIcon && (
            <span className={styles.leftIcon}>{leftIcon}</span>
          )}

          {/* 输入框 */}
          <input
            ref={ref}
            type={inputType}
            className={inputClasses}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readOnly}
            maxLength={maxLength}
            value={value}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...props}
          />

          {/* 右侧图标组 */}
          <RightIcons />
        </div>

        {/* 右侧插槽 */}
        {rightAddon && (
          <div className={styles.rightAddon}>{rightAddon}</div>
        )}
      </div>

      {/* 底部区域 */}
      <div className={styles.footer}>
        <MessageDisplay />
        <CountDisplay />
      </div>
    </div>
  );
});

Input.displayName = 'Input';

export default Input;