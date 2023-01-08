import React, { BaseSyntheticEvent } from 'react';
// import RingLoader from '../../atoms/Loaders/RingLoader.atom';
// import {
//     FormButton,
//     FormContent,
//     FormFieldSet,
//     FormMain,
//     FormTitle,
// } from './Form.molecule.styled';

import { Button, Checkbox, Form as AntForm, Input, Row, Col } from 'antd'

type FormProps = {
    children: React.ReactNode;
    title: string;
    isValid: boolean;
    onSubmit: (e?: BaseSyntheticEvent<unknown, any, any>) => Promise<void>;
    isLoading: boolean;
    buttonTitle?: string;
};

// const Form = ({
//     children,
//     title,
//     onSubmit,
//     isLoading,
//     isValid,
//     buttonTitle,
// }: FormProps): JSX.Element => {
//     const submitButtonTitle = buttonTitle || 'Simpan';

//     return (
//         <FormContainer>
//             <FormContent className="form__container">
//                 <FormTitle className="form__title">{title}</FormTitle>

//                 <FormMain onSubmit={onSubmit}>
//                     <FormFieldSet>{children}</FormFieldSet>

//                     <FormButton
//                         className="button"
//                         type="submit"
//                         disabled={!isValid || isLoading}
//                     >
//                         {isLoading ? (
//                             <RingLoader isLoading />
//                         ) : (
//                             submitButtonTitle
//                         )}
//                     </FormButton>
//                 </FormMain>
//             </FormContent>
//         </FormContainer>
//     );
// };

const Form = ({
    children,
    title,
    onSubmit,
    isLoading,
    isValid,
    buttonTitle,
}: FormProps): JSX.Element => {
    // const submitButtonTitle = buttonTitle || 'Simpan';

    return (
        <Row>
            <Col span={12} offset={6}>
                <AntForm
                    name="basic"
                    labelCol={{ span: 4, }}
                    wrapperCol={{ offset: 4, span: 16 }}
                    labelAlign='left'
                    initialValues={{ remember: true }}
                    autoComplete="off"
                    style={{ backgroundColor: 'white', padding: '4rem' }}

                >
                    <AntForm.Item
                        label='Email'
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </AntForm.Item>
                    <AntForm.Item
                        label='Password'
                        name="password"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input.Password />
                    </AntForm.Item>
                    <AntForm.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 8 }}>
                        <Checkbox>Remember me</Checkbox>
                    </AntForm.Item>
                    <AntForm.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </AntForm.Item>
                </AntForm>
            </Col>
        </Row>

    );
};

export default Form;
