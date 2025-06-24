// packages/shell/src/components/LoadingSpinner.tsx
import React from 'react';
import { motion } from 'framer-motion';
import styles from './LoadingSpinner.module.scss';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  message?: string;
  fullScreen?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
                                                         size = 'md',
                                                         message = '正在加载模块...',
                                                         fullScreen = true,
                                                       }) => {
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

  return (
    <motion.div
      className={`${styles.loadingContainer} ${fullScreen ? styles.fullScreen : ''}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className={styles.loadingContent}>
        <motion.div
          className={`${styles.spinner} ${styles[`spinner--${size}`]}`}
          variants={spinnerVariants}
          animate="spin"
        >
          <div className={styles.spinnerRing}>
            <div className={styles.spinnerInner} />
          </div>
        </motion.div>

        {message && (
          <motion.p
            className={styles.loadingMessage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {message}
          </motion.p>
        )}

        <motion.div
          className={styles.loadingDots}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className={styles.dot}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoadingSpinner;
