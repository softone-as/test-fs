/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */

import { Button, Form, Input, Row, Select, Space, Spin } from 'antd';
import React, { useState } from 'react';
import * as yup from 'yup';
import { createYupSync } from '../../../Utils/utils';

import { MainLayout as Layout } from '../../../Layouts/MainLayout';
import { createUser } from '../../../Modules/User/Action';
// import { IUserForm } from '../../../Modules/User/Entities';

const schema = yup.object().shape({
    fullname: yup.string().required('Field fullname is required'),
    password: yup.string().required('Field password is required').test('isFormatValid', 'At least password has include 1 number and Alphabet', (value, context) => {
        const hasUpperCase = /[A-Z]/.test(value);
        const hasNumber = /[0-9]/.test(value);

        if (hasNumber && hasUpperCase) {
            return true
        }

        return false
    }),
    email: yup.string().email().required('Field email is required'),
    gender: yup.mixed().oneOf(['perempuan', 'laki-laki']).required('Field gender is required'),
    phoneNumber: yup.string().required('Field phone number is required'),
    roles: yup.array().of(
        yup.object().shape({
            id: yup.number(),
            key: yup.string(),
            name: yup.string(),
        })
    )
})

const FormUserPage: React.FC = () => {
    const yupSync = createYupSync(schema);
    const [form] = Form.useForm()
    const [isLoading, setIsLoading] = useState(false)


    const onFinish = async () => {
        // setIsLoading(true)
        const data = form.getFieldsValue()

        try {
            await form.validateFields()
            // TODO: do post API
            createUser(data)
            // setIsLoading(false)

        } catch (error) {
            setIsLoading(false)
        }
    };

    return (
        <Layout>
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
                    onFinish={onFinish}
                    style={{ width: 600, margin: '2em 0' }}
                    form={form}
                    layout='vertical'
                >
                    <Form.Item label="Full Name" name='fullname' rules={[yupSync]} required>
                        <Input placeholder='Input' />
                    </Form.Item>

                    <Form.Item label="Email" name='email' rules={[yupSync]} required>
                        <Input type='email' placeholder='Input' />
                    </Form.Item>

                    <Form.Item label="Password" name='password' rules={[yupSync]} required>
                        <Input.Password placeholder='Input' />
                    </Form.Item>

                    <Form.Item label="Phone Number" name='phoneNumber' rules={[yupSync]} required>
                        <Input style={{ width: '100%' }} placeholder='Input' />
                    </Form.Item>

                    <Form.Item label="Roles" name='roles' rules={[yupSync]} required>
                        <Select placeholder='Select' mode='multiple'>
                            <Select.Option value={JSON.stringify({ id: 1, key: 'admin', name: 'admin', })}>Admin</Select.Option>
                        </Select>
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
