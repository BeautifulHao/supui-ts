import React, { FC, ChangeEvent, CSSProperties, InputHTMLAttributes } from 'react'
import classNames from 'classnames'
import Icon from '../Icon/icon';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'

export type InputSize = 'lg' | 'sm';

export interface InputPros extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
    className?: string;
    size?: InputSize;
    disabled?: boolean;
    addonBefore?: string | React.ReactNode;
    addonAfter?: string | React.ReactNode;
    icon?: IconDefinition;
    style?: CSSProperties;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Input: FC<InputPros> = (props) => {
    const {
        className,
        size,
        disabled,
        icon,
        addonBefore,
        addonAfter,
        style,
        ...restProps
    } = props

    if ('value' in props) {
        delete restProps.defaultValue
        restProps.value = !props.value ? '' : props.value;
    }

    const classes = classNames('supui-input', className,{ [`supui-input-size-${size}`]: size,})

    return (
        <div className={classes} style={{ ...style }}>
            {!icon && addonBefore ? (<span className="supui-input-before supui-input-addon">{addonBefore}</span>) : null}
            {icon ? (<div className="supui-icon-wrapper">
                <Icon icon={icon}></Icon>
            </div>) : null}
            <input disabled={disabled} {...restProps} className="supui-input-inner"></input>
            {!icon && addonAfter ? (<span className="supui-input-after supui-input-addon">{addonAfter}</span>) : null}
        </div>
    )
}

export default Input