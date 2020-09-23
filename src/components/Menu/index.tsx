import { FC } from 'react'
import Menu, { MenuPros } from './menu'
import MenuItem, { MenuItemProps } from './menuItem'
import SubMenu, { SubMenuProps } from './subMenu'


export type IMenuComponent = FC<MenuPros> & {
    Item: FC<MenuItemProps>,
    SubMenu: FC<SubMenuProps>
}
const TransMenu = Menu as IMenuComponent

TransMenu.Item = MenuItem
TransMenu.SubMenu = SubMenu

export default TransMenu