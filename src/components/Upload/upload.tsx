import React, { CSSProperties, useState, DragEvent, useRef, ChangeEvent, MouseEvent } from 'react'
import classNames from 'classnames'
import Icon from '../Icon/index'
import { faUpload, faSpinner, faCheckCircle, faTimesCircle, faTimes } from '@fortawesome/free-solid-svg-icons'
import Progress from '../Progress'
import axios from 'axios'

export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error'

export interface UploadFile {
    uid: string;
    size: number;
    name: string;
    status?: UploadFileStatus;
    percent?: number;
    raw?: File;
    response?: any;
    error?: any;
}

export interface UploadProps {
    action: string;
    defaultFileList?: UploadFile[];
    beforeUpload?: (file: File) => boolean | Promise<File>;
    onProgress?: (percentage: number, file: File) => void;
    onSuccess?: (data: any, file: File) => void;
    onError?: (err: any, file: File) => void;
    onChange?: (file: File) => void;
    onRemove?: (file: UploadFile) => void;
    headers?: { [key: string]: any };
    name?: string;
    data?: { [key: string]: any };
    withCredentials?: boolean;
    accept?: string;
    multiple?: boolean;
    styles?: CSSProperties;
}

export const Upload: React.FC<UploadProps> = (props: UploadProps) => {
    const {
        action,
        defaultFileList,
        beforeUpload,
        onProgress,
        onSuccess,
        onError,
        onChange,
        onRemove,
        name,
        headers,
        data,
        withCredentials,
        accept,
        multiple,
        styles
    } = props

    const [dragOver, setDragOver] = useState(false);
    const fileInput = useRef<HTMLInputElement>(null)
    const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || [])
    const classs = classNames('supui-upload')
    const optionClass = classNames('supui-upload-option', { 'drag-over': dragOver })

    const handleDrag = (e: DragEvent<HTMLElement>, over: boolean) => {
        e.preventDefault()
        setDragOver(over)
    }

    const handleDrop = (e: DragEvent<HTMLElement>) => {
        e.preventDefault()
        setDragOver(false)
        uploadFiles(e.dataTransfer.files)
    }

    const handleClick = (e: MouseEvent<HTMLDivElement>) => {
        fileInput.current?.click()
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (!files) {
            return
        }
        uploadFiles(files)
        if (fileInput.current) {
            fileInput.current.value = ''
        }
    }

    const handleRemove = (file: UploadFile) => {
        setFileList((prevList) => {
            return prevList.filter(item => item.uid !== file.uid)
        })
        if (onRemove) {
            onRemove(file)
        }
    }

    const uploadFiles = (files: FileList) => {
        let postFiles = Array.from(files)
        postFiles.forEach(file => {
            if (!beforeUpload) {
                post(file)
            } else {
                const result = beforeUpload(file)
                if (result && result instanceof Promise) {
                    result.then(processedFile => {
                        post(processedFile)
                    })
                } else if (result !== false) {
                    post(file)
                }
            }
        })
    }
    const post = (file: File) => {
        let _file: UploadFile = {
            uid: Date.now() + 'upload-file',
            status: 'ready',
            name: file.name,
            size: file.size,
            percent: 0,
            raw: file
        }

        setFileList(prevList => {
            return [_file, ...prevList]
        })
        const formData = new FormData()
        formData.append(name || 'file', file)
        if (data) {
            Object.keys(data).forEach(key => {
                formData.append(key, data[key])
            })
        }
        axios.post(action, formData, {
            headers: {
                ...headers,
                'Content-Type': 'multipart/form-data'
            },
            withCredentials,
            onUploadProgress: (e) => {
                let percentage = Math.round((e.loaded * 100) / e.total) || 0;
                if (percentage < 100) {
                    updateFileList(_file, { percent: percentage, status: 'uploading' })
                    if (onProgress) {
                        onProgress(percentage, file)
                    }
                }
            }
        }).then(resp => {
            updateFileList(_file, { status: 'success', response: resp.data })
            if (onSuccess) {
                onSuccess(resp.data, file)
            }
            if (onChange) {
                onChange(file)
            }
        }).catch(err => {
            updateFileList(_file, { status: 'error', error: err })
            if (onError) {
                onError(err, file)
            }
            if (onChange) {
                onChange(file)
            }
        })
    }

    const updateFileList = (updateFile: UploadFile, updateObj: Partial<UploadFile>) => {
        setFileList(prevList => {
          return prevList.map(file => {
            if (file.uid === updateFile.uid) {
              return { ...file, ...updateObj }
            } else {
              return file
            }
          })
        })
      }

    return (
        <div className={classs} style={{ ...styles }}>
            <div className={optionClass} onClick={handleClick}
                onDragOver={e => { handleDrag(e, true) }}
                onDragLeave={e => { handleDrag(e, false) }}
                onDrop={handleDrop}>
                <Icon icon={faUpload} size="5x" theme="secondary" ></Icon>
                <p>Drag file over to upload</p>
            </div>
            <input
                className="supui-file-input"
                style={{ display: 'none' }}
                ref={fileInput}
                onChange={handleFileChange}
                type="file"
                accept={accept}
                multiple={multiple}
            />
            <ul className="supui-upload-filelist">
                {fileList.map(item => {
                    return (
                        <li className="supui-upload-item" key={item.uid}>
                            <span>{item.name}</span>
                            <span className="supui-upload-item-status">
                                {(item.status === 'uploading' || item.status === 'ready') && <Icon title='loading' icon={faSpinner} spin theme="primary" />}
                                {item.status === 'success' && <Icon title='success' icon={faCheckCircle} theme="success" />}
                                {item.status === 'error' && <Icon title='error' icon={faTimesCircle} theme="danger" />}
                            </span>
                            <span className="supui-upload-item-action">
                                <Icon title="remove it" icon={faTimes} onClick={() => { handleRemove(item) }} />
                            </span>
                            {item.status === 'uploading' ? <Progress active={true} theme='success' percent={item.percent as number}></Progress> : null}
                        </li>)
                })}
            </ul>
        </div>
    )
}

Upload.defaultProps = {
    name: 'file'
}

export default Upload