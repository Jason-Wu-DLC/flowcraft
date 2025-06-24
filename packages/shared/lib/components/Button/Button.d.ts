import React, { ReactNode } from 'react';
import { HTMLMotionProps } from 'framer-motion';
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';
export interface ButtonProps extends Omit<HTMLMotionProps<"button">, 'size' | 'children' | 'ref'> {
    /** 按钮变体 */
    variant?: ButtonVariant;
    /** 按钮尺寸 */
    size?: ButtonSize;
    /** 是否为加载状态 */
    loading?: boolean;
    /** 按钮内容 */
    children: ReactNode;
    /** 左侧图标 */
    leftIcon?: ReactNode;
    /** 右侧图标 */
    rightIcon?: ReactNode;
    /** 是否为块级元素 */
    fullWidth?: boolean;
}
declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;
export default Button;
//# sourceMappingURL=Button.d.ts.map