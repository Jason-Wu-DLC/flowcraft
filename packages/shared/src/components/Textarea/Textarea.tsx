import React from 'react';
import classNames from 'classnames';
import styles from './Textarea.module.scss';

interface TextareaProps {
  value?: string;
  placeholder?: string;
  rows?: number;
  cols?: number;
  disabled?: boolean;
  readOnly?: boolean;
  maxLength?: number;
  minLength?: number;
  required?: boolean;
  name?: string;
  id?: string;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onKeyUp?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}

const Textarea: React.FC<TextareaProps> = ({
  value = '',
  placeholder,
  rows = 4,
  cols,
  disabled = false,
  readOnly = false,
  maxLength,
  minLength,
  required = false,
  name,
  id,
  className,
  onChange,
  onFocus,
  onBlur,
  onKeyDown,
  onKeyUp,
}) => {
  const textareaClasses = classNames(
    styles.textarea,
    {
      [styles.disabled]: disabled,
      [styles.readOnly]: readOnly,
    },
    className
  );

  return (
    <textarea
      value={value}
      placeholder={placeholder}
      rows={rows}
      cols={cols}
      disabled={disabled}
      readOnly={readOnly}
      maxLength={maxLength}
      minLength={minLength}
      required={required}
      name={name}
      id={id}
      className={textareaClasses}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
    />
  );
};

export default Textarea; 