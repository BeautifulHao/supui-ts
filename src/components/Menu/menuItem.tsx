import React, { FC, useContext } from "react";
import classNames from "classnames";
import { MenuContext } from './menu'

export interface MenuItemProps {
    index?: string;
    disabled?: boolean;
    className?: string;
    style?: React.CSSProperties;
    title?: string
}

export const MenuItem: React.FC<MenuItemProps> = (props) => {
    const { index, disabled, className, style, children,...rest } = props
    const context = useContext(MenuContext);

    const classes = classNames('supui-menu-item', className,
        {
            'supui-menu-item-disable': disabled,
            'supui-menu-item-selected': context.index === index
        });

    const handlerClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        e.stopPropagation()
        if (!disabled && context.onSelect && (typeof index === 'string')) {
            context.onSelect(index)
        }
    }

    return (
        <li className={classes}
            style={style}
            key={index}
            data-index={index}
            onClick={handlerClick} {...rest}>
            {children}
        </li>
    )
}

MenuItem.displayName = "MenuItem"
export default MenuItem