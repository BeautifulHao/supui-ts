import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions'
import {Alert,AlertProps} from '../Alert/alert'
import { faAward } from '@fortawesome/free-solid-svg-icons'

export default {
    title: 'Example/Alert',
    component: Alert
} as Meta;

const Template: Story<AlertProps> = (args: AlertProps) => (<Alert {...args} />);

export const InfoAlert = Template.bind({});

InfoAlert.args = {
    onClick: action('clicked'),
    type: 'info',
    message:'info alert test.',
    description:'this is a description,as you see!',
    showIcon:true,
    icon:faAward,
    closable:true,
    closeText:'close'
};