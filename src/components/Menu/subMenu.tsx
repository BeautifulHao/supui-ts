import React, { FC, useState, useContext, FunctionComponentElement, useEffect, useRef, useCallback } from "react";
import { findDOMNode } from "react-dom"
import classNames from "classnames";
import { MenuContext } from './menu'
import { MenuItemProps } from "./menuItem";
import Icon from '../Icon'
import { faAngleDown, faAngleUp, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import Transition from '../Transition/transition'
import useOutsideClick from '../../hooks/useOutsideClick'

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
    const [isOpenSub, setOpenSub] = useState(false);
    const ref = useRef<HTMLLIElement>(null);
    const [isTop, setIsTop] = useState(false);
    const classes = classNames('supui-submenu-item', className, {
        'supui-submenu-item-disable': disabled,
        'supui-submenu-item-selected': context.index === index
    })

    const clasesTitle = classNames('supui-subitem-title')

    const handlerClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        e.stopPropagation()
        if (!disabled) {
            if (context.mode === 'horizontal') {
                setOpenSub(true)
            }
            else {
                if (isTop && isOpenSub === false && context.onTopSubOpenChange) {
                    context.onTopSubOpenChange(index)
                }
                setOpenSub(value => {
                    return !value
                })
            }
        }
    }

    const renderChildren = () => {
        const subMenuClasses = classNames('supui-submenu', `supui-submenu-${isTop ? 'toplevel' : 'sublevel'}`)

        const childrenComponent = React.Children.map(children, (child, itemIndex) => {
            const childElement = child as FunctionComponentElement<MenuItemProps>
            if (childElement.type.displayName === 'MenuItem' || childElement.type.displayName === 'SubMenu') {
                return React.cloneElement(childElement, { index: `${index}-${itemIndex}` })
            } else {
                console.error("Warning:SubMenu has a child which is not a MenuItem|SubMenu component.")
            }
        })

        return (
            <Transition in={isOpenSub} timeout={300} animation={context.mode === 'horizontal' ? (isTop ? 'zoom-in-top' : 'zoom-in-left') : 'zoom-in-top'}>
                <ul className={subMenuClasses} style={{ display: isOpenSub ? 'block' : 'none' }}>
                    {childrenComponent}
                </ul>
            </Transition>

        )
    }

    const outSideCallBack = useCallback(() => {
        if (context.mode === 'horizontal') {
            setOpenSub(false)
        }
    }, [context.mode])

    useOutsideClick(ref, outSideCallBack)

    useEffect(() => {
        const parentNode = findDOMNode(ref.current)?.parentNode as HTMLElement;
        if (parentNode && parentNode.className.startsWith('supui-menu ')) {
            setIsTop(true)
        }
    }, [ref]);

    useEffect(() => {
        if (context.mode === 'horizontal') {
            if (context.index !== index && context.index.startsWith(index as string)) {
                setOpenSub(false)
            }
        }
    }, [context.index, index, context.mode])

    useEffect(() => {
        if (context.mode === 'vertical' && context.openTopIndex && index !== context.openTopIndex) {
            setOpenSub(false)
        }
    }, [context.openTopIndex, index, context.mode])

    const getIcon = () => {
        if (context.mode === 'horizontal') {
            return isTop ? (isOpenSub ? faAngleUp : faAngleDown) : faAngleRight
        }
        else {
            return isOpenSub ? faAngleUp : faAngleDown
        }
    }

    return (
        <li className={classes}
            style={style}
            data-index={index}
            onClick={handlerClick}
            key={index} ref={ref}>
            <div className={clasesTitle}>
                {title}
                <Icon icon={getIcon()} className="supui-subitem-title-icon"></Icon>
            </div>
            {renderChildren()}
        </li>
    )
}
SubMenu.displayName = "SubMenu"
export default SubMenu