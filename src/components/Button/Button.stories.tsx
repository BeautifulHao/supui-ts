import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions'
import { Button, ButtonProps } from './button';
import { Icon } from '../Icon/icon';
import { faDownload } from '@fortawesome/free-solid-svg-icons'

export default {
    title: 'Example/Button',
    component: Button
} as Meta;

const Template: Story<ButtonProps> = (args: ButtonProps) => (<Button {...args} />);

export const Primary = Template.bind({});

Primary.args = {
    onClick: action('clicked'),
    btnType: 'primary',
    size: 'lg',
    children: 'Button',
    block: false
};

export const Link = Template.bind({});

Link.args = {
    onClick: action('clicked'),
    btnType: 'link',
    href: 'https://www.baidu.com',
    children: 'Link Button',
}

export const IconButton = Template.bind({});

IconButton.args = {
    onClick: action('clicked'),
    btnType: 'primary',
    size: 'lg',
    Icon: <Icon icon={faDownload}></Icon>,
    children: 'Button',
}


export const LoadingButton = Template.bind({});

LoadingButton.args = {
    onClick: action('clicked'),
    btnType: 'default',
    size: 'lg',
    loading:true,
    children: 'Button',
}

