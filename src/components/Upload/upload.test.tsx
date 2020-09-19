import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import axios from 'axios'
import { render, RenderResult, fireEvent, waitFor, createEvent } from '@testing-library/react'
import { Upload, UploadProps } from './upload'


jest.mock('axios')

const mockedAxios = axios as jest.Mocked<typeof axios>

const testProps: UploadProps = {
    action: "fakeurl.com",
    onSuccess: jest.fn(),
    onChange: jest.fn(),
    onRemove: jest.fn()
}

const testErrorProps: UploadProps = {
    action: "fakeurl.com",
    onError: jest.fn(),
    onChange: jest.fn(),
    onRemove: jest.fn()
}

let wrapper: RenderResult, fileInput: HTMLInputElement, uploadArea: HTMLElement

const testFile = new File(['xyz'], 'test.png', { type: 'image/png' })

describe('test upload component', () => {

    it('upload process should works fine', async () => {

        wrapper = render(<Upload {...testProps}>Click to upload</Upload>)
        fileInput = wrapper.container.querySelector('.supui-file-input') as HTMLInputElement
        uploadArea = wrapper.queryByText('Drag file over to upload')?.parentElement as HTMLDivElement

        const { queryByText } = wrapper
        mockedAxios.post.mockResolvedValue({ 'data': 'cool' })

        expect(uploadArea).toBeInTheDocument()
        expect(fileInput).not.toBeVisible()

        fireEvent.change(fileInput, { target: { files: [testFile] } })
        expect(wrapper.getByTitle('loading')).toBeInTheDocument()

        await waitFor(() => {
            expect(queryByText('test.png')).toBeInTheDocument()
        })

        expect(wrapper.getByTitle('success')).toBeInTheDocument()
        expect(testProps.onSuccess).toHaveBeenCalledWith('cool', testFile)
        expect(testProps.onChange).toHaveBeenCalledWith(testFile)

        //remove the uploaded file
        expect(wrapper.getByTitle('remove it')).toBeInTheDocument()
        fireEvent.click(wrapper.getByTitle('remove it'))

        expect(queryByText('test.png')).not.toBeInTheDocument()
        expect(testProps.onRemove).toHaveBeenCalledWith(expect.objectContaining({
            raw: testFile,
            status: 'success',
            name: 'test.png'
        }))
    })

    it('upload process should works fine when server found some error.', async () =>{

        wrapper = render(<Upload {...testErrorProps}>Click to upload</Upload>)
        fileInput = wrapper.container.querySelector('.supui-file-input') as HTMLInputElement
        uploadArea = wrapper.queryByText('Drag file over to upload')?.parentElement as HTMLDivElement
        const someError = new Error('500')
        const { queryByText } = wrapper
        mockedAxios.post.mockRejectedValue(someError)

        expect(uploadArea).toBeInTheDocument()
        expect(fileInput).not.toBeVisible()

        fireEvent.change(fileInput, { target: { files: [testFile] } })
        expect(wrapper.getByTitle('loading')).toBeInTheDocument()

        await waitFor(() => {
            expect(queryByText('test.png')).toBeInTheDocument()
        })

        expect(wrapper.getByTitle('error')).toBeInTheDocument()
        expect(testErrorProps.onError).toHaveBeenCalledWith(someError,testFile)
        expect(testErrorProps.onChange).toHaveBeenCalledWith(testFile)

        //remove the uploaded file
        expect(wrapper.getByTitle('remove it')).toBeInTheDocument()
        fireEvent.click(wrapper.getByTitle('remove it'))

        expect(queryByText('test.png')).not.toBeInTheDocument()
        expect(testErrorProps.onRemove).toHaveBeenCalledWith(expect.objectContaining({
            raw: testFile,
            status: 'error',
            name: 'test.png'
        }))
    })

    it('drag and drop files should works fine', async () => {

        wrapper = render(<Upload {...testProps}>Click to upload</Upload>)
        fileInput = wrapper.container.querySelector('.supui-file-input') as HTMLInputElement
        uploadArea = wrapper.queryByText('Drag file over to upload')?.parentElement as HTMLDivElement


        fireEvent.dragOver(uploadArea)
        expect(uploadArea).toHaveClass('drag-over ')
        fireEvent.dragLeave(uploadArea)
        expect(uploadArea).not.toHaveClass('drag-over ')
        const mockDropEvent = createEvent.drop(uploadArea)
        Object.defineProperty(mockDropEvent, "dataTransfer", {
            value: {
                files: [testFile]
            }
        })
        fireEvent(uploadArea, mockDropEvent)

        await waitFor(() => {
            expect(wrapper.queryByText('test.png')).toBeInTheDocument()
        })
        expect(testProps.onSuccess).toHaveBeenCalledWith('cool', testFile)
    })

})