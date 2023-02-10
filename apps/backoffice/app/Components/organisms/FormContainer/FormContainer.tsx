import { Col, Form, FormProps, Grid, Row } from 'antd';
import React from 'react';
import ButtonFormAction from './ButtonFormAction';

interface IFormProps extends FormProps {
    isFieldCentered?: boolean; //centered by field as point (use case: for form basic with horizontal layout)
    centered?: boolean; //centered by form as point
    justifyButton?: 'start' | 'end';
    buttonAction?: React.ReactNode[];
}

const FormContainer = (props: IFormProps): JSX.Element => {
    const {
        isFieldCentered,
        centered,
        justifyButton = 'end',
        buttonAction,
        children,
        ...rest
    } = props;
    const { lg } = Grid.useBreakpoint();

    return (
        <Row justify={centered && !isFieldCentered ? 'center' : 'start'}>
            <Col
                span={centered ? (lg ? 10 : isFieldCentered ? 16 : 24) : 24}
                offset={isFieldCentered ? (lg ? 8 : 6) : 0}
            >
                <Form
                    {...rest}
                    layout={isFieldCentered ? 'horizontal' : props.layout}
                    labelCol={
                        isFieldCentered && {
                            span: 8,
                            style: isFieldCentered && {
                                position: 'absolute',
                                transform: 'translateX(-100%)',
                            },
                        }
                    }
                    wrapperCol={isFieldCentered && { span: 18 }}
                    style={{ ...props.style }}
                >
                    <>
                        {children}
                        <ButtonFormAction
                            justify={justifyButton}
                            buttonAction={buttonAction}
                            style={{
                                marginInlineEnd: isFieldCentered && '25%',
                            }}
                        />
                    </>
                </Form>
            </Col>
        </Row>
    );
};

export default FormContainer;
