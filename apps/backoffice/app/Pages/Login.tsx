/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
import * as yup from 'yup';
import React from 'react';
import {
    Form,
    Checkbox,
    Button,
    Input,
    Typography,
    Space,
    notification,
} from 'antd';
import { LoginLayout } from '../Layouts';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import { Link } from '@inertiajs/inertia-react';
import { doLogin } from '../Modules/Auth/Login/Actions';
import { TLogin } from '../Modules/Auth/Login/Entities';
import { TInertiaProps } from '../Modules/Inertia/Entities';
import { createYupSync } from '../Utils/utils';

const schema: yup.SchemaOf<TLogin> = yup.object().shape({
    email: yup
        .string()
        .email('Field Email wajib berformat email')
        .required('Field Email wajib diisi'),
    password: yup.string().required('Field Password wajib diisi'),
});

const Login = (props: TInertiaProps) => {
    const yupSync = createYupSync(schema);
    const [form] = Form.useForm<TLogin>();

    const [api, contextHolder] = notification.useNotification();

    const openNotification = (type: string) => {
        if (type === 'error') {
            api.error({
                message: 'Error',
                description: 'Terjadi Kesalahan',
                placement: 'topRight',
            });
        }
        if (type === 'success') {
            api.success({
                message: 'Success',
                description: 'Welcome Joen Doe',
                placement: 'topRight',
            });
        }
    };

    const onSubmit = (loginData: TLogin): void => {
        doLogin(loginData);
    };

    return (
        <LoginLayout title="Login">
            {contextHolder}
            <Space
                size={16}
                direction="vertical"
                style={{
                    backgroundColor: 'white',
                    width: '100%',
                    alignItems: 'center',
                    paddingTop: '4rem',
                }}
            >
                <Typography.Title>Ant Design</Typography.Title>
                <Typography.Text style={{ opacity: 0.5 }}>
                    Ant Design is the most influential web design specification
                    in Xihu district
                </Typography.Text>
            </Space>
            <Form
                form={form}
                name="basic"
                labelCol={{ span: 4 }}
                wrapperCol={{ offset: 4, span: 16 }}
                labelAlign="left"
                initialValues={{ remember: true }}
                autoComplete="off"
                style={{ backgroundColor: 'white', padding: '4rem' }}
                onFinish={onSubmit}
            >
                <Form.Item name="email" rules={[yupSync]}>
                    <Input placeholder="Username" prefix={<UserOutlined />} />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[yupSync]}
                    validateStatus={props?.error?.message && 'error'}
                    help={props?.error?.message}
                >
                    <Input.Password
                        placeholder="Password"
                        prefix={<LockOutlined />}
                    />
                </Form.Item>
                <Form.Item
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{ offset: 4, span: 8 }}
                >
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        style={{ width: '100%' }}
                    >
                        Login
                    </Button>
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
                    <Link href="/auth/forgot-password">Forgot Password?</Link>
                </Form.Item>
            </Form>
        </LoginLayout>
    );
};
export default Login;
