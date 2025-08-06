import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './BackButton.module.scss';
import Button from '@flowcraft/shared/components/Button';

interface BackButtonProps {
  onClick?: () => void;
  className?: string;
  label?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ 
  onClick, 
  className = '', 
  label = '返回'
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(-1);
    }
  };

  return (
    <Button
      variant="text"
      onClick={handleClick}
      className={`${styles.backButton} ${className}`}
      icon="←"
    >
      {label}
    </Button>
  );
};

export default BackButton;