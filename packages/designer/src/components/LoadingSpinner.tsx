import React from 'react';
import styles from './LoadingSpinner.module.scss';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'medium', 
  color = '#007bff', 
  className = '' 
}) => {
  const sizeMap = {
    small: '20px',
    medium: '40px',
    large: '60px'
  };

  return (
    <div 
      className={`${styles.spinnerContainer} ${className}`} 
      style={{ width: sizeMap[size], height: sizeMap[size] }}
    >
      <div 
        className={styles.spinner} 
        style={{ borderColor: `${color} transparent transparent transparent` }}
      ></div>
    </div>
  );
};

export default LoadingSpinner;