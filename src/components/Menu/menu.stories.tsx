import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Menu, MenuPros } from './menu';
import { MenuItem } from './menuItem';
import { SubMenu } from './subMenu'

export default {
    title: 'Example/Menu',
    component: Menu
} as Meta;

const Template: Story<MenuPros> = (args: MenuPros) => (
    <Menu {...args} >
        <MenuItem>item One</MenuItem>
        <MenuItem>item Two</MenuItem>
        <MenuItem disabled={true}>item 3</MenuItem>
        <SubMenu title="SubMenu">
            <MenuItem>item 4</MenuItem>
            <MenuItem>item 5</MenuItem>
            <MenuItem disabled={true}>item 6</MenuItem>
        </SubMenu>
    </Menu>
);

export const VerticalMode = Template.bind({});

VerticalMode.args = {
    mode: 'horizontal'
};