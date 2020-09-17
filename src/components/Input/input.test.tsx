import React from 'react'
import { render, RenderResult, fireEvent } from '@testing-library/react'
import { config } from 'react-transition-group'
import { InputPros, Input } from './input'
import { faAirFreshener } from '@fortawesome/free-solid-svg-icons'
config.disabled = true

const defaultProps: InputPros = {
    size: 'lg',
    style: { width: '300px' },
    onChange: jest.fn(),
    placeholder: 'please-input.',
    addonAfter: 'com'
}

const iconProps: InputPros = {
    size: 'sm',
    placeholder: 'icon-input',
    icon: faAirFreshener
}

const disabledProps:InputPros = {
    disabled:true,
    placeholder:'disabled',
    addonBefore:'https://'
}

describe('test Input', () => {

    it('should render the corrent default input', () => {
        const wrapper: RenderResult = render(<Input {...defaultProps} />)
        const inputNode: HTMLInputElement = wrapper.getByPlaceholderText('please-input.') as HTMLInputElement
        fireEvent.change(inputNode, { target: { value: 'a' } })
        expect(inputNode.value).toBe('a')
        expect(defaultProps.onChange).toBeCalled()
        expect(inputNode).toHaveClass('supui-input-inner')
        expect(wrapper.getByText('com')).toBeInTheDocument()
        expect(inputNode.parentElement).toHaveClass('supui-input-size-lg')
    });

    it('should render the corrent icon input',() =>{
        const wrapper:RenderResult = render(<Input {...iconProps}/>)
        const inputNode: HTMLInputElement = wrapper.getByPlaceholderText('icon-input') as HTMLInputElement
        expect(inputNode.parentElement?.firstChild).toHaveClass('supui-icon-wrapper')
    })

    it("should render the corrent disabled input",() =>{
        const wrapper:RenderResult = render(<Input {...disabledProps}/>)
        const inputNode: HTMLInputElement = wrapper.getByPlaceholderText('disabled') as HTMLInputElement
        expect(inputNode.disabled).toBeTruthy()
    })

});


