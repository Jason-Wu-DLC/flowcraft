import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import styles from './LoadingSpinner.module.scss';
const LoadingSpinner = ({ size = 'md', message = '正在加载模块...', fullScreen = true, }) => {
    const spinnerVariants = {
        spin: {
            rotate: 360,
            transition: {
                duration: 1,
                repeat: Infinity,
                ease: "linear",
            },
        },
    };
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { duration: 0.3 }
        },
    };
    return (_jsx(motion.div, { className: `${styles.loadingContainer} ${fullScreen ? styles.fullScreen : ''}`, variants: containerVariants, initial: "hidden", animate: "visible", children: _jsxs("div", { className: styles.loadingContent, children: [_jsx(motion.div, { className: `${styles.spinner} ${styles[`spinner--${size}`]}`, variants: spinnerVariants, animate: "spin", children: _jsx("div", { className: styles.spinnerRing, children: _jsx("div", { className: styles.spinnerInner }) }) }), message && (_jsx(motion.p, { className: styles.loadingMessage, initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.2 }, children: message })), _jsx(motion.div, { className: styles.loadingDots, initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 0.5 }, children: [0, 1, 2].map((i) => (_jsx(motion.div, { className: styles.dot, animate: {
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 1, 0.5],
                        }, transition: {
                            duration: 1.5,
                            repeat: Infinity,
                            delay: i * 0.2,
                        } }, i))) })] }) }));
};
export default LoadingSpinner;
