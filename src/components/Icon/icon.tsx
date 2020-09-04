import React, { CSSProperties } from 'react'
import classNames from 'classnames';
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'

export type ThemeProps = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark'

interface IconInnerProps {
    theme?: ThemeProps,  
    style?: CSSProperties,
    color?: string
    spin?: boolean
}

export type IconProps = IconInnerProps & FontAwesomeIconProps ;

export const Icon: React.FC<IconProps> = (props) => {
    const { className, theme, ...restProps } = props
    const classes = classNames('supui-icon', className, {
        [`icon-${theme}`]: theme
    })

    return (
        <FontAwesomeIcon className={classes} {...restProps}></FontAwesomeIcon>
    )
}

export default Icon