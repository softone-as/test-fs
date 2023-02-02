import { Button, ButtonProps } from 'antd'
import React from 'react'


// eslint-disable-next-line @typescript-eslint/naming-convention
function Buttons(props: ButtonProps) {

    if (props.icon) {
        return (
            <Button {...props} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {props.children}
            </Button>
        )
    }

    return (
        <Button {...props}>{props.children}</Button>
    )
}

export default Buttons