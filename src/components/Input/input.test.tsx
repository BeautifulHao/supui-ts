import React from 'react'
import { Input, InputPros} from './input'
import { mount } from 'enzyme'

const defaultProps: InputPros = {
    size:'lg',
    style: { width: '300px' },
    placeholder: 'please input.',
}

const addonProps: InputPros = {
    size:'lg',
    style: { width: '300px' },
    placeholder: 'please input.',
    addonBefore:'https://',
    onChange:jest.fn(),
    value:'111'
}


describe('test Input', () => {
    it('should render the corrent default input', () => {
        const wrapper = mount(<Input {...defaultProps}></Input>)
        expect(wrapper.find('.supui-input').hasClass('supui-input-size-lg')).toBe(true)
        expect(wrapper.find('.supui-input-inner').html().indexOf('please input.')>0).toBe(true)
    });

    it('should render the corrent addon input', () => {
        const wrapper = mount(<Input {...addonProps}></Input>)
        expect(wrapper.find('.supui-input-addon').hasClass('supui-input-before')).toBe(true)
        expect(wrapper.find('.supui-input-before').html().indexOf('https')>0).toBe(true)
        expect(wrapper.find('input').prop('value')).toBe('111');
        wrapper.find('input').simulate('change', { target: { value: '222' } });
        expect(addonProps.onChange).toBeCalled()

    });
});


