import React, { CSSProperties } from 'react';
import { FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
export declare type ThemeProps = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark';
interface IconInnerProps {
    theme?: ThemeProps;
    style?: CSSProperties;
    color?: string;
    spin?: boolean;
}
export declare type IconProps = IconInnerProps & FontAwesomeIconProps;
export declare const Icon: React.FC<IconProps>;
export default Icon;
