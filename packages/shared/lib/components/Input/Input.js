import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// packages/shared/src/components/Input/Input.tsx
import { forwardRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import classNames from 'classnames';
import { Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';
import { useTheme } from '../../themes/context';
import styles from './Input.module.scss';
const Input = forwardRef(({ size = 'md', variant = 'default', status = 'default', label, placeholder, helperText, errorMessage, successMessage, required = false, disabled = false, readOnly = false, leftIcon, rightIcon, leftAddon, rightAddon, showCount = false, maxLength, clearable = false, onClear, onChange, className, type = 'text', value = '', ...props }, ref) => {
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
    const containerClasses = classNames(styles.container, styles[`container--${size}`], {
        [styles['container--focused']]: isFocused,
        [styles['container--disabled']]: disabled,
        [styles['container--readonly']]: readOnly,
        [styles['container--error']]: actualStatus === 'error',
        [styles['container--success']]: actualStatus === 'success',
        [styles['container--warning']]: actualStatus === 'warning',
    }, className);
    const inputClasses = classNames(styles.input, styles[`input--${variant}`], styles[`input--${size}`], {
        [styles['input--with-left-icon']]: leftIcon,
        [styles['input--with-right-icon']]: rightIcon || isPasswordType || clearable,
        [styles['input--with-left-addon']]: leftAddon,
        [styles['input--with-right-addon']]: rightAddon,
    });
    // 处理输入变化
    const handleChange = (e) => {
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
                return _jsx(AlertCircle, { size: 16, className: styles.statusIcon });
            case 'success':
                return _jsx(CheckCircle, { size: 16, className: styles.statusIcon });
            default:
                return null;
        }
    };
    // 右侧操作图标
    const RightIcons = () => (_jsxs("div", { className: styles.rightIcons, children: [clearable && value && !disabled && !readOnly && (_jsx("button", { type: "button", className: styles.clearButton, onClick: handleClear, tabIndex: -1, children: "\u00D7" })), isPasswordType && (_jsx("button", { type: "button", className: styles.passwordToggle, onClick: togglePasswordVisibility, tabIndex: -1, children: showPassword ? _jsx(EyeOff, { size: 16 }) : _jsx(Eye, { size: 16 }) })), _jsx(StatusIcon, {}), rightIcon && (_jsx("span", { className: styles.rightIcon, children: rightIcon }))] }));
    // 计数显示
    const CountDisplay = () => {
        if (!showCountDisplay)
            return null;
        return (_jsxs("div", { className: styles.count, children: [_jsx("span", { className: currentLength > maxLength ? styles.countError : '', children: currentLength }), _jsxs("span", { children: ["/", maxLength] })] }));
    };
    // 消息显示
    const MessageDisplay = () => {
        const message = errorMessage || successMessage || helperText;
        if (!message)
            return null;
        return (_jsx(AnimatePresence, { children: _jsx(motion.div, { className: classNames(styles.message, {
                    [styles.messageError]: errorMessage,
                    [styles.messageSuccess]: successMessage,
                    [styles.messageHelper]: helperText && !errorMessage && !successMessage,
                }), initial: { opacity: 0, y: -8 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -8 }, transition: { duration: 0.2 }, children: message }) }));
    };
    return (_jsxs("div", { className: styles.wrapper, children: [label && (_jsxs("label", { className: styles.label, children: [label, required && _jsx("span", { className: styles.required, children: "*" })] })), _jsxs("div", { className: containerClasses, children: [leftAddon && (_jsx("div", { className: styles.leftAddon, children: leftAddon })), _jsxs("div", { className: styles.inputWrapper, children: [leftIcon && (_jsx("span", { className: styles.leftIcon, children: leftIcon })), _jsx("input", { ref: ref, type: inputType, className: inputClasses, placeholder: placeholder, disabled: disabled, readOnly: readOnly, maxLength: maxLength, value: value, onChange: handleChange, onFocus: () => setIsFocused(true), onBlur: () => setIsFocused(false), ...props }), _jsx(RightIcons, {})] }), rightAddon && (_jsx("div", { className: styles.rightAddon, children: rightAddon }))] }), _jsxs("div", { className: styles.footer, children: [_jsx(MessageDisplay, {}), _jsx(CountDisplay, {})] })] }));
});
Input.displayName = 'Input';
export default Input;
