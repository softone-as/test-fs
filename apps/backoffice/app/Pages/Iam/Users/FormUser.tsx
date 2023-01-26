/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */

import { Button, DatePicker, Form, Input, InputNumber, Row, Select, Space, Spin } from 'antd';
import { createYupSync } from '../../../Utils/utils';
import React, { useState } from 'react';
// import {
//     // FormBasic,
//     // FormStep,
//     FormAdvanced
// } from '../../../Components/organisms/Form';
import * as yup from 'yup'
// import { yupResolver } from '@hookform/resolvers/yup';
// import { Inertia } from '@inertiajs/inertia';
// import { useForm } from 'react-hook-form';
// import { usePage } from '@inertiajs/inertia-react';

// import { EndpointRoute } from '../../../Enums/Route';

import { DashboardLayout as Layout } from '../../../Layouts/Dashboard';

// import {
//     FormUserType,
// } from '../../../modules/User/Entity/User';
// import {
//     ErrorType,
//     SuccessType,
// } from '../../../modules/Common/Entity/Common';

// import { notifySuccess, setServerError } from '../../../Utils/utils';

// import useLoading from '../../../modules/Hook/useLoading';
// import { UserResponse } from '../../../../src/modules/iam/responses/user.response';
// import { RoleResponse } from '../../../../src/modules/iam/responses/role.response';

// type FormUserProps = {
//     data: Omit<UserResponse, 'password'>;
//     roles: Omit<RoleResponse, 'permissions'>[];
//     isUpdate?: boolean;
//     id: string;
// };

// const schema = yup.object().shape({
//     fullname: yup.string().required('Field Nama wajib diisi'),
//     email: yup
//         .string()
//         .required('Field Email User wajib diisi'),
//     phoneNumber: yup.string().required('Field Phon Number Telpon wajib diisi'),
//     roleId: yup.string().required('Field Role wajib diisi'),
// });

type DataType = {
    birthDate: string,
    email: string,
    emailVerifiedAt: string,
    fullname: string,
    gender: string,
    id: number,
    identityNumber: string,
    oneSignalPlayerIds: string,
    password: string,
    phoneNumber: string,
    phoneNumberVerifiedAt: string
}

const schema
    // bug: emailVerifiedAt still required but another field not
    // : yup.SchemaOf<Omit<DataType,
    //     'emailVerifiedAt ' | 'id' | 'identityNumber' | 'oneSignalPlayerIds' | 'phoneNumberVerifiedAt'>>
    = yup.object().shape({
        fullname: yup.string().required('Field fullname is required'),
        password: yup.string().required('Field password is required'),
        birthDate: yup.string().required('Field birth date is required'),
        email: yup.string().email().required('Field email is required'),
        gender: yup.string().required('Field gender is required'),
        phoneNumber: yup.string().required('Field phone number is required'),
    })

const FormUserPage: React.FC = () => {
    const yupSync = createYupSync(schema);
    const [form] = Form.useForm()
    const [isLoading, setIsLoading] = useState(false)

    const onFinish = async (values: any) => {
        setIsLoading(true)

        try {
            await form.validateFields()
            // TODO: do post API

            setIsLoading(false)
            console.log('Received values of form: ', values);
        } catch (error) {
            console.log(error);
            setIsLoading(false)
        }

        // setIsLoading(false)
    };

    return (
        <Layout title='Add New User'>
            {/* layout = vertical | horizontal */}
            {/* <FormBasic layout='vertical' /> */}

            {/* <FormStep /> */}

            {/* <FormAdvanced /> */}

            {isLoading ? (
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute',
                    width: '80%',
                    height: '100%',
                    background: 'rgb(255 255 255 / 63%)',
                    zIndex: 99
                }}>
                    <Spin size='large' />
                </div>
            ) : null}

            {/* Implement Form User */}
            <Row justify='center' style={{ backgroundColor: '#fff', borderRadius: 8 }}>
                <Form
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 20 }}
                    initialValues={{ prefix: '62', quantity: 3, status: true, suffix: 'USD', rate: 4, aggreement: true, 'checkbox-item': 'A' }}
                    onFinish={onFinish}
                    style={{ width: 600, margin: '2em 0' }}
                    form={form}
                    layout='vertical'
                >
                    <Form.Item label="Full Name" name='fullname' rules={[yupSync]} required>
                        <Input placeholder='Input' />
                    </Form.Item>

                    <Form.Item label="Password" name='password' rules={[yupSync]} required>
                        <Input.Password placeholder='Input' />
                    </Form.Item>

                    <Form.Item label="Email" name='email' rules={[yupSync]} required>
                        <Input type='email' placeholder='Input' />
                    </Form.Item>

                    <Form.Item label="Birth of Date" name='birthDate' rules={[yupSync]} required>
                        <DatePicker placeholder='Input' />
                    </Form.Item>

                    <Form.Item label="Gender" name='gender' rules={[yupSync]} required>
                        <Select placeholder='Select'>
                            <Select.Option value='man'>Man</Select.Option>
                            <Select.Option value='woman'>Woman</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item label="Phone Number" name='phoneNumber' rules={[yupSync]} required>
                        <InputNumber style={{ width: '100%' }} placeholder='Input' />
                    </Form.Item>

                    <Row>
                        <Space>
                            <Button>
                                Discard
                            </Button>
                            <Button type="primary" htmlType="submit" disabled={form.getFieldsError().filter(({ errors }) => errors.length).length > 0}
                            >
                                Submit
                            </Button>
                        </Space>
                    </Row>
                </Form>
            </Row>

        </Layout >
    );
};

export default FormUserPage;
