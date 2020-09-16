import React, { useState } from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import Button from '../Button/index'
import { Input, InputPros } from './input';
import { faAward } from '@fortawesome/free-solid-svg-icons'


export default {
    title: 'Example/Input',
    component: Input
} as Meta;

const Template: Story<InputPros> = (args: InputPros) => (<Input {...args} />);

export const defaultInput = Template.bind({});

defaultInput.args = {
    onChange: (e) => { console.log(e.target.value) },
    style: { width: '300px' },
    placeholder: 'please input.',
    size: 'lg'
};

export const leftAddno = Template.bind({})

leftAddno.args = {
    style: { width: '300px' },
    placeholder: 'please input.',
    addonBefore: 'https://',
    size: 'lg'
};


export const rightAddno = Template.bind({})

rightAddno.args = {
    style: { width: '300px' },
    placeholder: 'please input.',
    addonAfter: 'km/s',
    size: 'lg'
};

export const addno = Template.bind({})

addno.args = {
    style: { width: '300px' },
    placeholder: 'please input.',
    addonAfter: '.com',
    addonBefore: 'https://',
    icon: faAward,
    size: 'sm'
};

export const disabledInput = Template.bind({})

disabledInput.args = {
    style: { width: '300px' },
    placeholder: 'please input.',
    disabled: true
};

const ControllerInput:React.FC<any> = () =>{
    const [value, setValue] = useState<string>('123')
    return <Input value={value} defaultValue={value} onChange={(e) => {setValue(e.target.value)}}/>
}

const TemplateController: Story<InputPros> = (args: InputPros) => (<ControllerInput {...args} />);

export const controllers = TemplateController.bind({})