import React, { FC, useState, useContext } from "react";
import classNames from "classnames";
import { MenuContext } from './menu'

export interface MenuItemProps {
    index?: string;
    disabled?: boolean;
    className?: string;
    style?: React.CSSProperties;
}

export const MenuItem: React.FC<MenuItemProps> = (props) => {
    const { index, disabled, className, style, children } = props
    const context = useContext(MenuContext);
    const [isActive, setIsActive] = useState(false);

    const classes = classNames('supui-menu-item', className,
        {
            'supui-menu-item-active': !disabled && isActive,
            'supui-menu-item-disable': disabled,
            'supui-menu-item-selected': context.index === index
        });

    const handlerMouseOver = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        e.stopPropagation();
        setIsActive(true)
    }

    const handlerMouseLeave = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        e.stopPropagation();
        setIsActive(false)
    }

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
            onMouseOver={handlerMouseOver}
            onMouseLeave={handlerMouseLeave}
            onClick={handlerClick}>
            {children}
        </li>
    )

}

MenuItem.displayName = "MenuItem"
export default MenuItem