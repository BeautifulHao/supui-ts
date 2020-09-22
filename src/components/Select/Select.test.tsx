import React from 'react'
import { config } from 'react-transition-group'
import { render, RenderResult, fireEvent, waitFor } from '@testing-library/react'
import { Select, SelectProps } from './Select'
import { Option } from './Option'

config.disabled = true

const defaultProps: SelectProps = {
    styles: { width: 360 },
    placeholder: 'select item.',
    name: "test",
    disabled: false,
    onChange:jest.fn(),
}

let wrapper: RenderResult, inputNode: HTMLInputElement
describe('test Select component', () => {

    beforeEach(() => {
        wrapper = render(<Select {...defaultProps} >
            <Option value="1" label="abc"></Option>
            <Option value="2" label="efg"></Option>
            <Option value="3" label="qwe"></Option>
            <Option value="5" label="qewe"></Option>
            <Option value="6" label="qewwe"></Option>
            <Option value="7" label="qew3e"></Option>
            <Option value="8" label="wwqw"></Option>
        </Select>)

        inputNode = wrapper.container.querySelector('.supui-select-input-inner') as HTMLInputElement
    })

    it('test basic Select behavior', async () => {
        expect(inputNode).toBeInTheDocument()
        fireEvent.focus(inputNode)
        await waitFor(() => {
            expect(wrapper.queryByTitle('wwqw')).toBeInTheDocument()
        })

        const firstResult = wrapper.queryByText('wwqw')

        fireEvent.click(firstResult as HTMLLIElement)

        expect(defaultProps.onChange).toHaveBeenCalled()

        await waitFor(() => {
            expect(firstResult).toHaveClass('is-select')
        })
    })

})