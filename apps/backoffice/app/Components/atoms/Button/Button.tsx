import { Button as AntdButton, ButtonProps } from 'antd';
import React from 'react';
import { isMobileScreen } from '../../../Utils/utils';

interface IProps extends ButtonProps {
    icon?: React.ReactNode;
    responsive?: boolean;
}

const Button: React.FC<IProps> = ({
    icon,
    responsive = true,
    children,
    ...rest
}) => {
    const isMobile = isMobileScreen();
    const showChildren = isMobile ? responsive && !icon : true;

    return (
        <AntdButton
            icon={icon}
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
            {...rest}
        >
            {showChildren && children}
        </AntdButton>
    );
};

export default Button;