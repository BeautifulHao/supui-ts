import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Menu,MenuPros } from './menu';

export default {
    title: 'Example/Menu',
    component: Menu
} as Meta;

const Template: Story<MenuPros> = (args: MenuPros) => (<Menu {...args} />);

export const VerticalMode = Template.bind({});

VerticalMode.args = {
    mode: 'vertical'
};