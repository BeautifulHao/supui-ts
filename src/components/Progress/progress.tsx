import React, { FC } from 'react'
import { ThemeProps } from '../util/common'
import classNames from 'classnames'

export interface ProgressProps {
    percent: number;
    strokeHeight?: number;
    showText?: boolean;
    styles?: React.CSSProperties;
    active?:boolean;
    theme?: ThemeProps;
}

export const Progress: FC<ProgressProps> = (props: ProgressProps) => {
    const {
        percent,
        strokeHeight = 15,
        showText,
        styles,
        theme,
        active=false,
    } = props

    const innerClasss = classNames('supui-progress-inner',`color-${theme}`,{
        [`supui-progress-inner-active`]:active
    })

    return (
        <div className="supui-progress" style={{ ...styles, height: strokeHeight }}>
            <div className="supui-progress-outer">
                <div className={innerClasss} style={{ width: `${percent}%` }}>
                    {showText ? <span className="inner-text" title={`${percent}%`}>{`${percent}%`}</span> : null}
                </div>
            </div>
        </div>
    )
}

Progress.defaultProps ={
    theme:'primary',
    strokeHeight:15
}

export default Progress;