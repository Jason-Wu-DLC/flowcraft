import React from 'react';
import styles from './ErrorAlert.module.scss';

interface ErrorAlertProps {
  message: string;
  onRetry?: () => void;
  className?: string;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ message, onRetry, className = '' }) => {
  return (
    <div className={`${styles.errorAlert} ${className}`} role="alert">
      <div className={styles.icon}>⚠️</div>
      <div className={styles.content}>
        <p>{message}</p>
        {onRetry && (
          <button 
            className={styles.retryButton}
            onClick={onRetry}
          >
            重试
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorAlert;