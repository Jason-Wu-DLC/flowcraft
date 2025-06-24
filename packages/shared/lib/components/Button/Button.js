import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import classNames from 'classnames';
import { useTheme } from '../../themes/context';
import styles from './Button.module.scss';
// 3. 组件实现
const Button = forwardRef(({ variant = 'primary', size = 'md', loading = false, disabled = false, children, leftIcon, rightIcon, fullWidth = false, className, onClick, 
// 4. 🔥 关键：分离 motion 属性和其他属性
whileHover, whileTap, whileFocus, animate, initial, exit, transition, variants, ...restProps }, ref) => {
    const { theme } = useTheme();
    // 5. 样式类名计算
    const buttonClasses = useMemo(() => classNames(styles.button, styles[`button--${variant}`], styles[`button--${size}`], {
        [styles['button--loading']]: loading,
        [styles['button--disabled']]: disabled || loading,
        [styles['button--full-width']]: fullWidth,
        [styles[`button--${theme}`]]: theme,
    }, className), [variant, size, loading, disabled, fullWidth, theme, className]);
    // 6. 点击事件处理
    const handleClick = useCallback((e) => {
        if (loading || disabled) {
            e.preventDefault();
            e.stopPropagation();
            return;
        }
        onClick?.(e);
    }, [loading, disabled, onClick]);
    // 7. 加载动画组件
    const LoadingSpinner = useMemo(() => (_jsx(motion.div, { className: styles.spinner, animate: { rotate: 360 }, transition: {
            duration: 1,
            repeat: Infinity,
            ease: "linear"
        }, "aria-hidden": "true", children: _jsx("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", children: _jsx("circle", { cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeDasharray: "32", strokeDashoffset: "32" }) }) })), []);
    // 8. 按钮内容渲染
    const buttonContent = useMemo(() => (_jsxs("div", { className: styles.buttonInner, children: [loading && LoadingSpinner, !loading && leftIcon && (_jsx("span", { className: styles.iconLeft, "aria-hidden": "true", children: leftIcon })), _jsx("span", { className: styles.content, children: children }), !loading && rightIcon && (_jsx("span", { className: styles.iconRight, "aria-hidden": "true", children: rightIcon }))] })), [loading, leftIcon, rightIcon, children, LoadingSpinner]);
    // 9. 🔥 关键：Motion 属性配置
    const motionProps = useMemo(() => ({
        whileHover: disabled || loading ? undefined : (whileHover || { scale: 1.02 }),
        whileTap: disabled || loading ? undefined : (whileTap || { scale: 0.98 }),
        whileFocus: disabled || loading ? undefined : whileFocus,
        animate: disabled || loading ? undefined : animate,
        initial,
        exit,
        transition: transition || { duration: 0.15, ease: "easeOut" },
        variants,
    }), [
        disabled,
        loading,
        whileHover,
        whileTap,
        whileFocus,
        animate,
        initial,
        exit,
        transition,
        variants
    ]);
    // 10. 渲染组件
    return (_jsx(motion.button, { ref: ref, type: "button", className: buttonClasses, disabled: disabled || loading, onClick: handleClick, "aria-disabled": disabled || loading, "aria-busy": loading, ...motionProps, ...restProps, children: buttonContent }));
});
Button.displayName = 'Button';
export default Button;
