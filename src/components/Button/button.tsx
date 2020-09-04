import React, { FC, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react'
import classNames from 'classnames'
import { Icon } from '../Icon/icon';
import { faSpinner } from '@fortawesome/free-solid-svg-icons'


export type ButtonSize = 'lg' | 'sm';
export type ButtonType = 'primary' | 'default' | 'danger' | 'link';

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

type NativeButtonProps = InnerButtonPros & ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = InnerButtonPros & AnchorHTMLAttributes<HTMLElement>
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>

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
    block,
    Icon: SelfIcon,
    loading,
    ...restProps
  } = props

  const classes = classNames('btn', className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    'disabled': (btnType === 'link') && disabled,
    'btn-block': block
  })

  if (btnType === 'link' && href) {
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
        disabled={disabled || loading === true}
        {...restProps}
      >
        {loading ? (<Icon icon={faSpinner} spin={true} />) : undefined}{SelfIcon}{children}
      </button>
    )
  }
}

Button.defaultProps = {
  disabled: false,
  btnType: 'default'
}

export default Button;