import React from 'react'
import { render, RenderResult } from '@testing-library/react'
import { Progress, ProgressProps } from './progress'

const defaultProps : ProgressProps = {
    percent:60,
    active:true,
    showText:true,
    strokeHeight:30,
    theme:'info'
}

describe('test Progress', () => {

    it('should render the corrent default Progress', () => {
        const wrapper: RenderResult = render(<Progress {...defaultProps} />)
        const inputNode: HTMLSpanElement = wrapper.getByTitle('60%') as HTMLSpanElement
        expect(inputNode).toBeInTheDocument()
        expect(inputNode).toHaveClass('inner-text')
        expect(inputNode.parentElement).toHaveClass('supui-progress-inner-active')
    });
})