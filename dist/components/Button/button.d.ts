import React, { FC, ButtonHTMLAttributes } from 'react';
export declare type ButtonSize = 'lg' | 'sm';
export declare type ButtonType = 'primary' | 'default' | 'danger' | 'link';
interface InnerButtonPros {
    className?: string;
    size?: ButtonSize;
    disabled?: boolean;
    btnType?: ButtonType;
    children: React.ReactNode;
}
export declare type ButtonProps = InnerButtonPros & ButtonHTMLAttributes<HTMLElement>;
export declare const Button: FC<ButtonProps>;
export {};
