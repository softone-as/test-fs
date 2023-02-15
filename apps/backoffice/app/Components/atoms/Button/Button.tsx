import { Button as AntdButton, ButtonProps } from 'antd';
import React from 'react';
import { isMobileScreen } from '../../../Utils/utils';

interface IProps extends ButtonProps {
    icon?: React.ReactNode;
    responsive?: boolean;
}

const Button: React.FC<IProps> = ({ icon, responsive, children, ...rest }) => {
    const isMobile = isMobileScreen();
    const showChildren = !isMobile || (isMobile && !icon && !responsive);

    const size = responsive ? (isMobile ? 'middle' : 'large') : 'large';

    return (
        <AntdButton
            size={size}
            icon={icon}
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: isMobile ? '20px' : 0,
            }}
            {...rest}
        >
            {showChildren && children}
        </AntdButton>
    );
};

export default Button;
