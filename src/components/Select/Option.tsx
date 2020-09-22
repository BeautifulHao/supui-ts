import React, { MouseEvent } from 'react'
import classnames from 'classnames'
import Icon from '../Icon'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

export interface OptionProps {
    label: string;
    value: string;
    index?: string;
    renderItem?: (item: OptionProps) => React.ReactNode;
    onClick?: (item: OptionProps) => void;
    selected?: boolean
}

export const Option: React.FC<OptionProps> = (props) => {
    const { label, value, index, renderItem, onClick, selected } = props;

    const itemClick = (e: React.MouseEvent) => {
        if (onClick) {
            onClick({ label, value, index })
        }
    }

    const classs = classnames('supui-select-item', { [`is-select`]: selected })

    return (
        <li
            onClick={itemClick}
            className={classs}
            key={index ? index : value}
            data-value={value} title={label}>
            {renderItem ? renderItem({ ...props }) : label}
            { selected ? (<span className="supui-select-item-check">
                <Icon icon={faCheck}></Icon>
            </span>) : null}
        </li>
    )

}

Option.defaultProps = {
    selected: false
}

Option.displayName = "Option"

export default Option