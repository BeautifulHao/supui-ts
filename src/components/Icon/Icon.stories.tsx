import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Icon, IconProps } from './icon';
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import faCustom from './custom'
import { action } from '@storybook/addon-actions'


export default {
    title: 'Example/Icon',
    component: Icon
} as Meta;

const Template: Story<IconProps> = (args: IconProps) => (<Icon {...args} />);

export const InfoIcon = Template.bind({});

InfoIcon.args = {
    onClick: action('clicked'),
    theme: 'danger',
    icon: faSpinner,
    size: 'lg',
    style: { fontSize: 16 },
    spin: true
};

export const customIcon = Template.bind({});

customIcon.args = {
    theme: 'info',
    icon: faCustom,
    style: { fontSize: 32 },
    color:'red',
    size: 'lg',
    spin: true
};
