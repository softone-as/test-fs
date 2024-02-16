/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
import React from 'react';
import {
    Form,
    Checkbox,
    Button,
    Input,
    Typography,
    Space,
    Row,
    Col,
} from 'antd';
import { LoginLayout } from '../Layouts';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import { Link } from '@inertiajs/inertia-react';
import { doLogin } from '../Modules/Auth/Login/Actions';
import { TInertiaProps } from '../Modules/Inertia/Entities';
import { isMobileScreen } from '../Utils/utils';
import { themeColors } from '../Utils/theme';
import { FormContainer } from '../Components/organisms/FormContainer';
import { createSchemaFieldRule } from 'antd-zod';
import {
    AuthLoginSchema,
    TAuthLoginSchema,
} from 'apps/backoffice/@contracts/auth/auth-login.contract';

const formItemSpacingStyle = {
    marginBottom: '16px',
};

const Login = (props: TInertiaProps): React.ReactNode => {
    const zodSync = createSchemaFieldRule(AuthLoginSchema);
    const [form] = Form.useForm<TAuthLoginSchema>();

    const isMobile = isMobileScreen();

    // warning value never used
    // const [api, contextHolder] = notification.useNotification();

    // const openNotification = (type: string) => {
    //     if (type === 'error') {
    //         api.error({
    //             message: 'Error',
    //             description: 'Terjadi Kesalahan',
    //             placement: 'topRight',
    //         });
    //     }
    //     if (type === 'success') {
    //         api.success({
    //             message: 'Success',
    //             description: 'Welcome Joen Doe',
    //             placement: 'topRight',
    //         });
    //     }
    // };

    const onSubmit = (loginData: TAuthLoginSchema): void => {
        doLogin(loginData);
    };

    return (
        <LoginLayout title="Login">
            <Row align="middle" justify="center" style={{ height: '80%' }}>
                <Col
                    span={24}
                    style={{ padding: `4rem ${isMobile ? '' : '7rem'}` }}
                >
                    <Space
                        direction="vertical"
                        style={{
                            width: '100%',
                            alignItems: 'center',
                            textAlign: 'center',
                        }}
                    >
                        <Typography.Title level={4}>
                            Welcome back!
                        </Typography.Title>
                        <Typography.Text style={{ opacity: 0.5 }}>
                            Ant Design is the most influential web design
                            specification in Xihu district
                        </Typography.Text>
                    </Space>

                    <FormContainer
                        form={form}
                        name="basic"
                        labelAlign="left"
                        initialValues={{ remember: true }}
                        autoComplete="off"
                        errors={props.error}
                        style={{ paddingTop: '2.5rem' }}
                        onFinish={onSubmit}
                        className="login-form"
                    >
                        <Form.Item
                            name="email"
                            rules={[zodSync]}
                            style={formItemSpacingStyle}
                        >
                            <Input
                                placeholder="Username"
                                prefix={<UserOutlined />}
                            />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[zodSync]}
                            style={formItemSpacingStyle}
                        >
                            <Input.Password
                                placeholder="Password"
                                prefix={<LockOutlined />}
                            />
                        </Form.Item>
                        <Form.Item style={formItemSpacingStyle}>
                            <Form.Item
                                name="remember"
                                valuePropName="checked"
                                noStyle
                            >
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>
                            <Link
                                href="/auth/forgot-password"
                                className="login-form-forgot"
                                style={{ color: themeColors.primary }}
                            >
                                Forgot Password?
                            </Link>
                        </Form.Item>
                        <Form.Item style={formItemSpacingStyle}>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="login-form-button"
                            >
                                Login
                            </Button>
                        </Form.Item>
                        <Form.Item
                            style={{
                                textAlign: 'center',
                                ...formItemSpacingStyle,
                            }}
                        >
                            Or{' '}
                            <Link
                                href="/auth/forgot-password"
                                style={{ color: themeColors.primary }}
                            >
                                Register now!
                            </Link>
                            {' Or '}
                            <a
                                href="/auth/sso-oidc"
                                target="blank"
                                style={{ color: themeColors.primary }}
                            >
                                Login by SSO
                            </a>
                        </Form.Item>
                    </FormContainer>
                </Col>
            </Row>
        </LoginLayout>
    );
};
export default Login;
