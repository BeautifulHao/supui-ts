import React, { FC, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';
export declare type ButtonSize = 'lg' | 'sm';
export declare type ButtonType = 'primary' | 'default' | 'danger' | 'link';
interface InnerButtonPros {
    className?: string;
    size?: ButtonSize;
    disabled?: boolean;
    btnType?: ButtonType;
    children: React.ReactNode;
    block: boolean;
    href?: string;
    Icon: React.ReactNode;
    loading: boolean;
}
declare type NativeButtonProps = InnerButtonPros & ButtonHTMLAttributes<HTMLElement>;
declare type AnchorButtonProps = InnerButtonPros & AnchorHTMLAttributes<HTMLElement>;
export declare type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;
export declare const Button: FC<ButtonProps>;
export default Button;
