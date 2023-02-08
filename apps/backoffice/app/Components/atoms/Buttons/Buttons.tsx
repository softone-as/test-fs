import { Button, ButtonProps } from 'antd';
import React from 'react';

const Buttons = (props: ButtonProps) => {
    if (props.icon) {
        return (
            <Button
                {...props}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {props.children}
            </Button>
        );
    }

    return <Button {...props}>{props.children}</Button>;
};

export default Buttons;
