import React from 'react'
import { render,fireEvent} from '@testing-library/react'
import Button,{ButtonProps} from './button'

const defaultProps = {
    onClick:jest.fn()
}

const primaryProps: ButtonProps= {
    btnType:'primary',
    size:'lg',
    className:'some-test'
}

const disabledProps = {
    onClick:jest.fn(),
    disabled:true
}

describe('test Button', () => {
    it('should render the corrent default button', () => {
        const wrapper = render(<Button {...defaultProps}>Good</Button>)
        const element = wrapper.getByText('Good') as HTMLButtonElement
        expect(element).toBeInTheDocument()
        expect(element.tagName).toEqual('BUTTON')
        expect(element).toHaveClass('btn btn-default')
        expect(element.disabled).toBeFalsy()
        fireEvent.click(element)
        expect(defaultProps.onClick).toHaveBeenCalled()
    });

    it('should render the corrent primary button', () => {
        const wrapper = render(<Button {...primaryProps}>Good</Button>)
        const element = wrapper.getByText('Good')
        expect(element).toBeInTheDocument()
        expect(element).toHaveClass('btn btn-primary btn-lg some-test')
    });

    it('should render a link when btnType equals link adn href is provided', () => {
        const wrapper = render(<Button btnType='link' href="https://www.baidu.com">Link</Button>)
        const element = wrapper.getByText('Link')
        expect(element).toBeInTheDocument()
        expect(element.tagName).toEqual('A')
        expect(element).toHaveClass('btn btn-link')
    });
    
    it('should render disabled button when disabled set to true', () => {
        const wrapper = render(<Button {...disabledProps} >Good</Button>)
        const element = wrapper.getByText('Good') as HTMLButtonElement
        expect(element).toBeInTheDocument()
        expect(element.disabled).toBeTruthy()
        fireEvent.click(element)
        expect(disabledProps.onClick).not.toHaveBeenCalled()
    });
    
    
});
