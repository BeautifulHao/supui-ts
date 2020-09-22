import React, { CSSProperties, useState, MouseEvent, useRef, useCallback } from 'react'
import Icon from '../Icon'
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import Option, { OptionProps } from './Option'
import Transition from '../Transition'
import useOutsideClick from '../../hooks/useOutsideClick'


interface OptionSourceObject {
    value: string;
    label: string;
    index?: string;
    disabled?: boolean
}

export type OptionValue<T = {}> = T & OptionSourceObject

export interface SelectProps {
    multiple?: boolean;
    placeholder?: string;
    disabled?: boolean;
    name?: string;
    optionList?: OptionValue[];
    onChange?: (value: string | string[]) => void;
    styles?: CSSProperties;
    itemRender?: (item: OptionProps) => React.ReactNode;
    defaultValue?: OptionValue;
    defaultValues?: string[];
}

export const Select: React.FC<SelectProps> = (props) => {
    const { multiple = false, placeholder, disabled, name, optionList, onChange, styles, children, itemRender, defaultValue } = props
    const [selectOptionOpen, setSelectOptionOpen] = useState<boolean>(false);
    const selectRef = useRef<HTMLDivElement>(null)
    const transitionCallback = useCallback(() => setSelectOptionOpen(false), [])
    const [selectValue, setSelectValue] = useState<OptionValue | undefined>(defaultValue)

    const dropDownHandler = (e: MouseEvent<HTMLDivElement>) => {
        if (!disabled) {
            setSelectOptionOpen((open: boolean) => { return !open })
        }
    }

    const OptionSelect = (item: OptionProps) => {
        setSelectValue(item);
        setSelectOptionOpen(false)
        if (onChange) {
            onChange(item.value)
        }
    }

    const renderOptions = () => {
        if (children) {
            return React.Children.map(children, (child, index) => {
                const childElement = child as React.FunctionComponentElement<any>
                const { displayName } = childElement.type;
                if (displayName === 'Option') {
                    return React.cloneElement(childElement,
                        {
                            index: index.toString(),
                            onClick: OptionSelect,
                            renderItem: itemRender,
                            selected: selectValue && childElement.props.value === selectValue.value
                        })
                }
                else {
                    console.log(displayName, child, childElement)
                    console.error("Warning:Menu has a child which is not a Option.")
                }
            })

        } else if (optionList && optionList.length > 0) {
            return optionList.map((item, index) => {
                return (<Option
                    value={item.value}
                    label={item.label}
                    index={index.toString()}
                    onClick={OptionSelect}
                    renderItem={itemRender}
                    selected={selectValue && item.value === selectValue.value}
                ></Option>)
            })
        } else {
            return <div className="supui-select-dropdown-nodata">
                <span>No Data.</span>
            </div>
        }
    }

    const focusHandler = (e: React.FocusEvent) => {
        setSelectOptionOpen(true)
    }

    useOutsideClick(selectRef, transitionCallback)

    return (
        <div className="supui-select" style={{ ...styles }} ref={selectRef}>
            <div className="supui-select-input">
                <div className="supui-select-wrapper">
                    <div className="supui-select-icon-wrapper" onClick={dropDownHandler}>
                        <Icon icon={selectOptionOpen ? faChevronUp : faChevronDown}></Icon>
                    </div>
                    <input
                        disabled={disabled}
                        placeholder={multiple === false ? (selectValue ? selectValue.label : placeholder) : undefined}
                        className="supui-select-input-inner"
                        onFocus={focusHandler}
                        type="text"
                        name={name} />
                </div>
            </div>
            <Transition timeout={300} animation="zoom-in-top" in={selectOptionOpen}>
                {<ul className="supui-select-dropdown">
                    {renderOptions()}
                </ul>}
            </Transition>
        </div>
    )
}

export default Select