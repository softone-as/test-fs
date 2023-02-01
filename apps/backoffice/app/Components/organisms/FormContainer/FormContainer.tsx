import { Form, FormProps, Typography } from 'antd'
import Card from 'antd/es/card/Card'
import React from 'react'

interface IFormProps extends FormProps {
    isFieldCentered?: boolean //centered by field as point
    title?: string
    centered?: boolean //centered by form as point
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/naming-convention
function FormContainer(props: IFormProps): JSX.Element {
    const { isFieldCentered, centered, ...rest } = props

    const marginCentered = props.isFieldCentered ? '-150px' : 0

    return (
        <Card
            style={centered && { display: 'flex', justifyContent: 'center' }}
            title={props.title &&
                <Typography.Title level={2} style={{ fontSize: '14px', margin: 0 }}>
                    {props.title}
                </Typography.Title>
            }
        >
            <Form
                {...rest}
                layout={isFieldCentered ? 'horizontal' : props.layout}
                labelCol={isFieldCentered && { span: 6 }}
                wrapperCol={isFieldCentered && { span: 18 }}
                style={{ ...props.style, marginLeft: marginCentered }}
            >

            </Form>
        </Card>
    )
}

export default FormContainer