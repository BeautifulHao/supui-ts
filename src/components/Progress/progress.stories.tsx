import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Progress, ProgressProps } from './progress'

export default {
    title: 'Example/Progress',
    component: Progress
} as Meta;

const Template: Story<ProgressProps> = (args: ProgressProps) => (<Progress {...args} />);

export const defaultProgress = Template.bind({});

defaultProgress.args = {
    percent: 40,
    theme: 'info',
    showText: true,
    strokeHeight: 40,
    active: true
}