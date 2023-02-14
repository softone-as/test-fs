import { Button, ButtonProps } from 'antd';
import React from 'react';
import { isMobileScreen } from '../../../Utils/utils';

interface IProps extends ButtonProps {
    icon?: React.ReactNode;
    responsive?: boolean;
}

const Buttons: React.FC<IProps> = ({ icon, responsive, children, ...rest }) => {
    const isMobile = isMobileScreen();
    const size = isMobile ? (responsive ? 'middle' : 'large') : 'large';

    return (
        <Button
            size={size}
            icon={icon}
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
            {...rest}
        >
            {!isMobile && children}
        </Button>
    );
};

export default Buttons;
