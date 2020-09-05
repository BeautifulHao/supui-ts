import React, { CSSProperties,useState } from 'react'
import classNames from 'classnames';
import Icon from '../Icon/icon';
import { faCheckCircle, faInfoCircle, faExclamationCircle, faTimesCircle, faTimes, IconDefinition } from '@fortawesome/free-solid-svg-icons'

export interface AlertProps {
    type: 'success' | 'info' | 'warning' | 'error';
    closable?: boolean;
    closeText?: React.ReactNode;
    message: React.ReactNode;
    description?: React.ReactNode;
    onClose?: React.MouseEventHandler<HTMLButtonElement>;
    afterClose?: () => void;
    showIcon?: boolean;
    style?: React.CSSProperties;
    className?: string;
    icon?: IconDefinition;
    onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
    onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export const Alert: React.FC<AlertProps> = (props) => {
    const {
        type,
        closable,
        closeText,
        message,
        description,
        onClose,
        afterClose,
        showIcon,
        icon,
        onMouseEnter,
        onMouseLeave,
        onClick,
        className,
        ...restProps
    } = props

    const [close, setclose] = useState(false);

    const icons = {
        'success': faCheckCircle,
        'info': faInfoCircle,
        'warning': faExclamationCircle,
        'error': faTimesCircle
    }

    const classes = classNames('supui-alert', className, {
        [`alert-${type}`]: type,
        [`supui-alert-noIcon`]: !showIcon,
        [`supui-alert-withDescript`]: description,
        [`supui-alert-withClosable`]: closable
    })

    const closeHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setclose(true)
        onClose?.(e);
    }

    const iconItem: IconDefinition = icon ? icon : icons[type];

    if (close) {
        return <div className="supui-alert-closed"></div>
    }
    else {
        return (
            <div className={classes} {...restProps} onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                {showIcon ? (<span className="supui-alert-icon">
                    <Icon icon={iconItem}></Icon>
                </span>) : null}
                <span className="supui-alert-message">
                    {message}
                </span>
                {
                    description ?
                        (<span className="supui-alert-description">
                            {description}
                        </span>)
                        : null
                }
                {
                    closable ?
                        (
                            <button type="button" className="supui-alert-closable" onClick={closeHandler}>
                                {closeText ? (<span className="supui-alert-closeText">{closeText}</span>) : (<Icon icon={faTimes} className="supui-alert-close-icon"></Icon>)}
                            </button>
                        ) : null
                }
            </div>
        )
    }
}

export default Alert