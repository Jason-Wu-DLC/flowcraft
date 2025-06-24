import React, { ReactNode } from 'react';
export type InputSize = 'sm' | 'md' | 'lg';
export type InputVariant = 'default' | 'filled' | 'flushed';
export type InputStatus = 'default' | 'error' | 'success' | 'warning';
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
    /** 输入框尺寸 */
    size?: InputSize;
    /** 输入框变体 */
    variant?: InputVariant;
    /** 输入框状态 */
    status?: InputStatus;
    /** 标签文本 */
    label?: string;
    /** 占位符文本 */
    placeholder?: string;
    /** 帮助文本 */
    helperText?: string;
    /** 错误信息 */
    errorMessage?: string;
    /** 成功信息 */
    successMessage?: string;
    /** 是否必填 */
    required?: boolean;
    /** 是否禁用 */
    disabled?: boolean;
    /** 是否只读 */
    readOnly?: boolean;
    /** 左侧图标 */
    leftIcon?: ReactNode;
    /** 右侧图标 */
    rightIcon?: ReactNode;
    /** 左侧插槽 */
    leftAddon?: ReactNode;
    /** 右侧插槽 */
    rightAddon?: ReactNode;
    /** 是否显示字符计数 */
    showCount?: boolean;
    /** 最大字符数 */
    maxLength?: number;
    /** 是否可清除 */
    clearable?: boolean;
    /** 清除回调 */
    onClear?: () => void;
    /** 值变化回调 */
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
declare const Input: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>;
export default Input;
//# sourceMappingURL=Input.d.ts.map