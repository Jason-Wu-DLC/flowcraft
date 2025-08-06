import React, { useState, useEffect } from 'react';
import styles from './SearchBar.module.scss';

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChange: (query: string) => void;
  className?: string;
  debounceDelay?: number;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  placeholder = '搜索...', 
  value, 
  onChange, 
  className = '', 
  debounceDelay = 300 
}) => {
  const [inputValue, setInputValue] = useState(value);
  const [isFocused, setIsFocused] = useState(false);

  // 处理防抖搜索
  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputValue !== value) {
        onChange(inputValue);
      }
    }, debounceDelay);

    return () => clearTimeout(timer);
  }, [inputValue, debounceDelay, onChange, value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleClear = () => {
    if (inputValue) {
      setInputValue('');
      onChange('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (inputValue !== value) {
        onChange(inputValue);
      }
    }
  };

  return (
    <div className={`${styles.searchBar} ${className} ${isFocused ? styles.focused : ''}`}>
      <span className={styles.searchIcon}>🔍</span>
      <input
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        aria-label="搜索"
      />
      {inputValue && (
        <button
          className={styles.clearButton}
          onClick={handleClear}
          aria-label="清除搜索"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default SearchBar;