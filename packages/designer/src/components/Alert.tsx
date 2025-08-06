import React from 'react';
import styles from './Alert.module.scss';

interface AlertProps {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  className?: string;
  onClose?: () => void;
  duration?: number;
}

const Alert: React.FC<AlertProps> = ({ 
  type, 
  message, 
  className = '', 
  onClose, 
  duration = 3000 
}) => {
  React.useEffect(() => {
    if (duration && onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success': return '✓';
      case 'error': return '⚠️';
      case 'warning': return '⚠️';
      case 'info': return 'ℹ️';
      default: return 'ℹ️';
    }
  };

  return (
    <div className={`${styles.alert} ${styles[type]} ${className}`} role="alert">
      <span className={styles.icon}>{getIcon()}</span>
      <span className={styles.message}>{message}</span>
      {onClose && (
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="关闭提示"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default Alert;