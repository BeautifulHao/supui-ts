import React from 'react'
import { mount } from 'enzyme'
import Alert, { AlertProps } from './alert'
import { faAward } from '@fortawesome/free-solid-svg-icons'


const successProps: AlertProps = {
    type: 'success',
    closable: true,
    showIcon:true,
    message: 'Success',
    description: 'some success',
    onClose:jest.fn()
}

const infoNoIconProps: AlertProps = {
    type: 'info',
    closable: false,
    showIcon:false,
    message: 'Success',
    description: 'some success',
    onClose:jest.fn()
}

const iconProps: AlertProps = {
    type: 'success',
    showIcon:true,
    message: 'Success',
    icon:faAward
}


describe('test Alert', () => {
    it('should render the corrent default alert', () => {
        const wrapper = mount(<Alert {...successProps}></Alert>)
        expect(wrapper.find('.supui-alert').hasClass('supui-alert alert-success')).toBe(true)
        expect(wrapper.find('.supui-alert').hasClass('supui-alert-withDescript')).toBe(true)
        expect(wrapper.find('.supui-alert').hasClass('supui-alert-withClosable')).toBe(true)
        expect(wrapper.find('.supui-alert').hasClass('supui-alert-noIcon')).toBe(false)
        expect(wrapper.find('.supui-alert-message')).toHaveLength(1);

        wrapper.find('.supui-alert-closable').simulate('click')
        expect(successProps.onClose).toHaveBeenCalled();

        expect(wrapper.find('.supui-alert-closed')).toHaveLength(1)
    });

    it('should render the corrent no-icon onClose alert', () => {
        const wrapper = mount(<Alert {...infoNoIconProps}></Alert>)
        expect(wrapper.find('.supui-alert').hasClass('supui-alert alert-info')).toBe(true)
        expect(wrapper.find('.supui-alert').hasClass('supui-alert-withClosable')).toBe(false)
        expect(wrapper.find('.supui-alert').hasClass('supui-alert-noIcon')).toBe(true)
    });

    it('should render the corrent self icon alert', () => {
        const wrapper = mount(<Alert {...iconProps}></Alert>)
        expect(wrapper.find('.fa-award').getDOMNode().tagName).toEqual('svg')
    });
    

});
