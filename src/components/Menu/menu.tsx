import React, { FC, createContext, useState } from "react";
import classNames from "classnames";

export type MenuType = "vertical" | "horizontal";

interface IMenuContext {
  index: string;
  onSelect?: (selectedIndex: string) => void;
  mode?: MenuType;
}

export const MenuContext = createContext<IMenuContext>({ index: '0' })

export interface MenuPros {
  className?: string;
  mode: MenuType;
  defaultSelectIndex?: string;
  onSelect?: (selectedIndex: string) => void
}

export const Menu: FC<MenuPros> = (props) => {
  const { className, children, mode, defaultSelectIndex, onSelect } = props
  const [selectIndex, setSelectIndex] = useState(defaultSelectIndex);
  const classes = classNames('supui-menu', className, {
    [`supui-menu-${mode}`]: mode
  })

  const handleClick = (index: string) => {
    setSelectIndex(index)
    if (onSelect) {
      onSelect(index)
    }
  }

  const passedContext: IMenuContext = {
    index: selectIndex ? selectIndex : '',
    onSelect: handleClick,
    mode,
  }

  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      console.log(child)
      const childElement = child as React.FunctionComponentElement<any>
      const { displayName } = childElement.type;
      if (displayName === 'MenuItem' || displayName === 'SubMenu') {
        return React.cloneElement(childElement, { index: index.toString() })
      }
      else {
        console.error("Warning:Menu has a child which is not a MenuItem or SubMenu compoment")
      }
    })
  }

  return (
    <ul className={classes}>
      <MenuContext.Provider value={passedContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  );
};

export default Menu;
