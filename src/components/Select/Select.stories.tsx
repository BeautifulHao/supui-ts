import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Select, SelectProps } from './Select';
import { Option } from './Option';

export default {
    title: 'Example/Select',
    component: Select
} as Meta;

const Template: Story<SelectProps> = (args: SelectProps) => (
    <Select {...args} >
        <Option value="1" label="abc"></Option>
        <Option value="2" label="efg"></Option>
        <Option value="3" label="qwe"></Option>
        <Option value="5" label="qewe"></Option>
        <Option value="6" label="qewwe"></Option>
        <Option value="7" label="qew3e"></Option>
        <Option value="8" label="wwqw"></Option>
    </Select>);

export const DefalutSelect = Template.bind({});

DefalutSelect.args = {
    styles: { width: 360 },
    placeholder: 'select item.',
    disabled: false
};

export const MultipleSelect = Template.bind({});

MultipleSelect.args = {
    styles: { width: 360 },
    placeholder: 'select item.',
    disabled: false,
    multiple:true
};