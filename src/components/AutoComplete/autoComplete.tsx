import React, { FC, useState, ChangeEvent, KeyboardEvent, ReactElement, useEffect, useRef, useCallback } from 'react'
import classNames from 'classnames'
import { Icon } from '../Icon/icon'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import Input, { InputPros } from '../Input/input'
import Transition from '../Transition/transition'
import useOutsideClick from '../../hooks/useOutsideClick'
import useDebounce from '../../hooks/useDebounce'

interface DataSourceObject {
    value: string;
}

export type DataSourceType<T = {}> = T & DataSourceObject

export interface AutoCompleteProps extends Omit<InputPros, 'onSelect'> {
    fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>;
    onSelect?: (item: DataSourceType) => void;
    renderOption?: (item: DataSourceType) => ReactElement;
}

export const AutoComplete: FC<AutoCompleteProps> = (props) => {
    const {
        fetchSuggestions,
        onSelect,
        value,
        renderOption,
        style,
        ...restProps
    } = props

    const [inputValue, setInputValue] = useState<string>(value as string)
    const [suggestions, setSuggestions] = useState<DataSourceType[]>([])
    const [suggestionLoading, setSuggestionLoading] = useState<boolean>(false)
    const [showDownList, setShowDownList] = useState<boolean>(false)
    const ulRef = useRef<HTMLUListElement>(null)
    const isFetchRef = useRef<boolean>(false)
    const lastChangeInput = useDebounce(inputValue)
    const [highlightIndex, setHighlightIndex] = useState<number>(-1)
    const downListHideHandler = useCallback(
        () => {
            setShowDownList(false)
        },
        [],
    )

    useOutsideClick(ulRef, downListHideHandler)

    useEffect(() => {
        if (isFetchRef.current && lastChangeInput) {
            const result = fetchSuggestions(lastChangeInput);
            if (result instanceof Promise) {
                setSuggestionLoading(true)
                result.then(data => {
                    setSuggestionLoading(false)
                    setSuggestions(data)
                    setShowDownList(data.length > 0)
                }).catch((e)=>{
                    setSuggestionLoading(false)
                    setSuggestions([])
                    console.error(e)
                })
            }
            else {
                setSuggestions(result)
                setShowDownList(result.length > 0)
            }
        }
        else {
            setShowDownList(false)
        }
        setHighlightIndex(-1)
    }, [fetchSuggestions, lastChangeInput])

    const onLiSelect = (item: DataSourceType) => {
        setInputValue(item.value)
        isFetchRef.current = false
    }

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const editValue = e.target.value.trim()
        isFetchRef.current = true
        setInputValue(editValue)
    }

    const onItemKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {

        switch (e.keyCode) {
            // enter
            case 13:
                if (suggestions[highlightIndex]) {
                    onLiSelect(suggestions[highlightIndex])
                }
                break
            //up
            case 38:
                highlight(highlightIndex - 1)
                break
            //down
            case 40:
                highlight(highlightIndex + 1)
                break
            // ESC
            case 27:
                setShowDownList(false)
                break
            default:
                break
        }

    }

    const highlight = (index: number) => {
        if (index < 0) index = 0
        if (index >= suggestions.length) {
            index = suggestions.length - 1
        }
        setHighlightIndex(index)
    }
    const classs = classNames('supui-autoComplete')
    const suggestionClasss = classNames('supui-autoComplete-suggestion')

    const renderSuggestion = () => {
        return (
            <Transition timeout={300} animation="zoom-in-top" in={showDownList || suggestionLoading}>
                <ul className={suggestionClasss} ref={ulRef}>
                    {suggestionLoading &&
                        <div className="suggstions-loading-icon">
                            <Icon icon={faSpinner} spin />
                        </div>
                    }
                    {suggestions.map((item, index) => {
                        const itemClasss = classNames('supui-autoComplete-li', { [`is-active`]: index === highlightIndex })
                        return <li className={itemClasss} key={item.value + index} onClick={() => { onLiSelect(item) }}>{renderOption ? renderOption(item) : item.value}</li>
                    })}
                </ul>
            </Transition>
        )
    }

    return (
        <div className={classs} style={{ ...style }}>
            <Input {...restProps} value={inputValue} onChange={onChange} onKeyDown={onItemKeyDown}></Input>
            {renderSuggestion()}
        </div>
    )
}

export default AutoComplete