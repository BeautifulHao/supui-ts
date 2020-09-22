import React, { CSSProperties } from 'react';
import { FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import { ThemeProps } from '../util/common';
interface IconInnerProps {
    theme?: ThemeProps;
    style?: CSSProperties;
    color?: string;
    spin?: boolean;
}
export declare type IconProps = IconInnerProps & FontAwesomeIconProps;
export declare const Icon: React.FC<IconProps>;
export default Icon;
