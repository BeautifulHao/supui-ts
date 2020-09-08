import React, { FC } from "react";
import classNames from "classnames";

export type MenuType = "vertical" | "horizontal";

export interface MenuPros {
  className?: string;
  mode: MenuType;
}

export const Menu: FC<MenuPros> = (props) => {
  return (
    <ul>
      <li>item one</li>
      <li>item two</li>
    </ul>
  );
};

export default Menu;
