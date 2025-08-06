import React, { useState, useEffect, useRef } from 'react';
import styles from './FilterDropdown.module.scss';

interface Option<T = string> {
  value: T;
  label: string;
}

interface FilterDropdownProps<T = string> {
  options: Option<T>[];
  value?: T;
  onChange?: (value: T) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

const FilterDropdown = <T extends string = string>({
  options,
  value,
  onChange,
  placeholder = '请选择',
  className = '',
  disabled = false
}: FilterDropdownProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState<string>(placeholder);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 找到选中项的标签
  useEffect(() => {
    if (value !== undefined) {
      const selectedOption = options.find(option => option.value === value);
      if (selectedOption) {
        setSelectedLabel(selectedOption.label);
      } else {
        setSelectedLabel(placeholder);
      }
    } else {
      setSelectedLabel(placeholder);
    }
  }, [value, options, placeholder]);

  // 点击外部关闭下拉菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleOptionClick = (option: Option<T>) => {
    if (option.value !== value) {
      setSelectedLabel(option.label);
      if (onChange) {
        onChange(option.value);
      }
    }
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div 
      ref={dropdownRef} 
      className={`${styles.filterDropdown} ${className} ${isOpen ? styles.open : ''} ${disabled ? styles.disabled : ''}`}
    >
      <button
        type="button"
        className={styles.dropdownTrigger}
        onClick={toggleDropdown}
        disabled={disabled}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className={styles.selectedValue}>{selectedLabel}</span>
        <span className={styles.arrow}>{isOpen ? '▲' : '▼'}</span>
      </button>

      {isOpen && (
        <ul 
          className={styles.dropdownMenu} 
          role="listbox"
          aria-label={placeholder}
        >
          {options.map((option) => (
            <li 
              key={option.value} 
              className={`${styles.menuItem} ${value === option.value ? styles.selected : ''}`}
              onClick={() => handleOptionClick(option)}
              role="option"
              aria-selected={value === option.value}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FilterDropdown;