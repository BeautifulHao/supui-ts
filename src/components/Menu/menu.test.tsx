import React from 'react'
import Menu from './index'
import { mount } from 'enzyme'
import { MenuPros } from './menu'

const MenuItem = Menu.Item
const SubMenu = Menu.SubMenu

const Template = (args: MenuPros) => (
    <Menu {...args}>
        <MenuItem className='itemOne'>item One</MenuItem>
        <MenuItem className='itemTwo'>item Two</MenuItem>
        <MenuItem disabled={true}>item 3</MenuItem>
        <SubMenu className="sub1" title="SubMenu">
            <MenuItem>item 4</MenuItem>
            <MenuItem>item 5</MenuItem>
            <MenuItem disabled={true}>item 6</MenuItem>
            <SubMenu className="sub2" title="SubMenu2">
                <MenuItem>item 7</MenuItem>
                <MenuItem className='itemEight'>item 8</MenuItem>
                <MenuItem disabled={true}>item 9</MenuItem>
            </SubMenu>
        </SubMenu>
    </Menu>
);

const defaultProps: MenuPros = {
    onSelect: jest.fn(),
    mode: 'horizontal',
}

const verticalProps:MenuPros = {
    onSelect: jest.fn(),
    mode: 'vertical'
}

describe('test Button', () => {
    it('should render the corrent default menu', () => {
        const wrapper = mount(<Template {...defaultProps}></Template>)
        expect(wrapper.find('.supui-menu').hasClass('supui-menu-horizontal')).toBe(true)
        wrapper.find('.itemOne').first().simulate('click')
        expect(defaultProps.onSelect).toBeCalled()
        expect(wrapper.find('.itemOne').first().html().indexOf('supui-menu-item-selected') >= 0).toBe(true)
        expect(wrapper.find('.itemTwo').first().html().indexOf('supui-menu-item-selected') >= 0).toBe(false)

        wrapper.find('.sub1').first().simulate('click')
        wrapper.find('.sub2').first().simulate('click')
        wrapper.find('.itemEight').first().simulate('click')
        expect(defaultProps.onSelect).toBeCalled()
        expect(wrapper.find('.itemEight').first().html().indexOf('supui-menu-item-selected') >= 0).toBe(true)
        expect(wrapper.find('.itemOne').first().html().indexOf('supui-menu-item-selected') >= 0).toBe(false)
        
    });

    it('should render the corrent vertical menu',()=>{
        const wrapper = mount(<Template {...verticalProps}></Template>)
        expect(wrapper.find('.supui-menu').hasClass('supui-menu-vertical')).toBe(true)
    })
});
