import React, { FC, ButtonHTMLAttributes,AnchorHTMLAttributes } from 'react'
import classNames from 'classnames'

export type ButtonSize = 'lg' | 'sm';
export type ButtonType = 'primary' | 'default' | 'danger' | 'link';

interface InnerButtonPros {
    className?: string;
    size?: ButtonSize;
    disabled?: boolean;
    btnType?: ButtonType;
    children: React.ReactNode;
    href?:string
}

type NativeButtonProps = InnerButtonPros & ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = InnerButtonPros & AnchorHTMLAttributes<HTMLElement>
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>

//TODO: block	将按钮宽度调整为其父宽度的选项
//TODO: loading	设置按钮载入状态
//TODO: icon	设置按钮的图标组件
//TODO: 单元测试
export const Button: FC<ButtonProps> = (props) => {
    const {
        children,
        className,
        btnType,
        size,
        disabled,
        href,
        ...restProps
    } = props

    const classes = classNames('btn', className, {
        [`btn-${btnType}`]: btnType,
        [`btn-${size}`]: size,
        'disabled': (btnType === 'link') && disabled
    })

    if (btnType === 'link' && href ) {
        return (
          <a
            className={classes}
            href={href}
            {...restProps}
          >
            {children}
          </a>
        )
      } else {
        return (
          <button
            className={classes}
            disabled={disabled}
            {...restProps}
          >
            {children}
          </button>
        )
      }
}

Button.defaultProps = {
    disabled: false,
    btnType: 'default'
}

export default Button;