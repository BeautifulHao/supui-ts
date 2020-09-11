import React, { FC, useState, useContext, FunctionComponentElement } from "react";
import classNames from "classnames";
import { MenuContext } from './menu'
import { MenuItemProps } from "./menuItem";

export interface SubMenuProps {
    index?: string;
    title: string;
    className?: string;
    disabled?: boolean;
    style?: React.CSSProperties
}

export const SubMenu: React.FC<SubMenuProps> = (props) => {
    const { index, title, children, className, disabled, style } = props
    const context = useContext(MenuContext)
    const [isActive, setIsActive] = useState(false);

    const classes = classNames('supui-submenu-item', className, {
        'supui-submenu-item-disable': disabled,
        'supui-submenu-item-active': !disabled && isActive,
        'supui-submenu-item-selected': context.index === index
    })

    const clasesTitle = classNames('supui-subitem-title')

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

    const renderChildren = () => {
        const subMenuClasses = classNames('supui-submenu', {
            [`supui-submenu-open`]:  context.index && (context.index as string).startsWith(index as string)
        })

        const childrenComponent = React.Children.map(children, (child, itemIndex) => {
            const childElement = child as FunctionComponentElement<MenuItemProps>
            if (childElement.type.displayName === 'MenuItem') {
                return React.cloneElement(childElement, { index: `${index}-${itemIndex}` })
            } else {
                console.error("Warning:SubMenu has a child which is not a MenuItem component.")
            }
        })

        return (
            <ul className={subMenuClasses}>
                {childrenComponent}
            </ul>
        )


    }

    return (
        <li className={classes}
            style={style}
            data-index={index}
            onMouseOver={handlerMouseOver}
            onMouseLeave={handlerMouseLeave}
            onClick={handlerClick}
            key={index}>
            <div className={clasesTitle}>
                {title}
            </div>
            {renderChildren()}
        </li>
    )
}

export default SubMenu