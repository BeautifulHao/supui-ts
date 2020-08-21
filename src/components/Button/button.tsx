import React, { FC, ButtonHTMLAttributes } from 'react'
import classNames from 'classnames'

export type ButtonSize = 'lg' | 'sm';
export type ButtonType = 'primary' | 'default' | 'danger' | 'link';

interface InnerButtonPros {
    className?: string;
    size?: ButtonSize;
    disabled?: boolean;
    btnType?: ButtonType;
    children: React.ReactNode;
}

export type ButtonProps = InnerButtonPros & ButtonHTMLAttributes<HTMLElement>


export const Button: FC<ButtonProps> = (props) => {
    const {
        children,
        className,
        btnType,
        size,
        disabled,
        ...restProps
    } = props

    const classes = classNames('btn', className, {
        [`btn-${btnType}`]: btnType,
        [`btn-${size}`]: size
    })

    return (
        <button {...restProps} className={classes} disabled={disabled}>
            {children}
        </button>
    )
}

