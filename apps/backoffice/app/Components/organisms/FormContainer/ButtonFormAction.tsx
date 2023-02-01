import { Row, Space } from 'antd'
import React from 'react'

interface IButtonFormActionProps {
    buttonAction: React.ReactNode[]
    justify: 'start' | 'end'
}

// eslint-disable-next-line @typescript-eslint/naming-convention
function ButtonFormAction(props: IButtonFormActionProps) {
    return (
        <Row justify={props.justify} style={{ marginTop: '32px', marginBottom: '8px' }}>
            <Space>
                {props.buttonAction?.map((field, key) => <React.Fragment key={key}>{field}</React.Fragment>)}
            </Space>
        </Row>
    )
}

export default ButtonFormAction