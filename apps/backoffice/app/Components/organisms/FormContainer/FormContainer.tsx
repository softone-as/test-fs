import { Col, Form, FormProps, Grid, Row, Typography } from 'antd'
import Card from 'antd/es/card/Card'
import React from 'react'
import ButtonFormAction from './ButtonFormAction'

interface IFormProps extends FormProps {
    isFieldCentered?: boolean //centered by field as point (use case: for form basic with horizontal layout)
    title?: string
    centered?: boolean //centered by form as point
    justifyButton?: 'start' | 'end'
    buttonAction?: React.ReactNode[]
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/naming-convention
function FormContainer(props: IFormProps): JSX.Element {
    const { isFieldCentered, centered, justifyButton = 'end', buttonAction, ...rest } = props
    const { lg } = Grid.useBreakpoint()

    return (
        <Card
            title={props.title &&
                <Typography.Title level={2} style={{ fontSize: '14px', margin: 0 }}>
                    {props.title}
                </Typography.Title>
            }
        >
            <Row justify={(centered && !isFieldCentered) ? 'center' : 'start'}>
                <Col
                    span={centered ? (lg ? 10 : (isFieldCentered ? 16 : 24)) : 24}
                    offset={isFieldCentered ? (lg ? 8 : 6) : 0}
                >
                    <Form
                        {...rest}
                        layout={isFieldCentered ? 'horizontal' : props.layout}
                        labelCol={isFieldCentered && {
                            span: 8,
                            style: isFieldCentered && {
                                position: "absolute",
                                transform: "translateX(-100%)"
                            }
                        }}
                        wrapperCol={isFieldCentered && { span: 18 }}
                        style={{ ...props.style }}
                    >

                    </Form>

                    <ButtonFormAction
                        justify={justifyButton}
                        buttonAction={buttonAction}
                        style={{ marginInlineEnd: isFieldCentered && '25%' }}
                    />
                </Col>
            </Row>
        </Card >
    )
}

export default FormContainer