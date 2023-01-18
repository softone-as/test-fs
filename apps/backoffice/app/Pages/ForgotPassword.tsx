import * as yup from 'yup';
import React from 'react';
import { Form, Space, Input, Button, Typography, notification } from 'antd'
import { UserOutlined } from '@ant-design/icons';

import { LoginLayout } from '../Layouts';
import { Link } from '../Components/atoms/Link';
import { sendEmailForgotPassword } from '../Modules/Auth/ForgotPassword/Action';
import { TInertiaProps } from '../Modules/Inertia/Entities';





const schema = yup.object().shape({
    email: yup
        .string()
        .email('Field Email wajib berformat email')
        .required('Field Email wajib diisi'),
});

// const ForgotPassword = (): JSX.Element => {
//     const { isLoading, setIsLoading } = useLoading();

//     const {
//         handleSubmit,
//         control,
//         setError,
//         formState: { isValid },
//     } = useForm<ForgotPasswordType>({
//         mode: 'onChange',
//         resolver: yupResolver(schema),
//     });

//     const onSubmit = handleSubmit((loginData) => {
//         setIsLoading(true);
//         Inertia.post(EndpointRoute.ForgotPassword, loginData, {
//             onError: (_) => {
//                 setIsLoading(false);
//             },
//             onSuccess: (success) => {
//                 const message = (success.props.success as SuccessType)
//                     ?.message;
//                 notifySuccess(message);
//                 setIsLoading(false);
//             },
//         })
//     });

//     const error = usePage().props.error as ErrorType;

//     React.useEffect(() => {
//         setServerError(error, setError);
//     }, [error]);

//     return (
//         <LoginLayout title="Forgot Password">
//             <div className="login__container page__center">
//                 <div className="page__center">
//                     <img
//                         className="login__company__logo"
//                         src="/unity/img/logo.png"
//                     />
//                 </div>

//                 <Form
//                     buttonTitle="Submit"
//                     title="Forgot Password"
//                     onSubmit={onSubmit}
//                     isValid={isValid}
//                     isLoading={isLoading}
//                 >
//                     <ControlledTextInput
//                         title="Email"
//                         name="email"
//                         placeholder="Input email"
//                         control={control}
//                     />

//                 </Form>
//             </div>

//             <div className="page__center">
//                 <br />
//                 <br />
//                 <Link href={EndpointRoute.AdminLogin}>Back to Login Admin ?</Link>
//             </div>
//         </LoginLayout>
//     );
// };

const ForgotPassword = (props: TInertiaProps) => {

    const [form] = Form.useForm<TForgotPassword>()

    const [api, contextHolder] = notification.useNotification()


    const openNotification = (type: string) => {
        if (type === 'error') {
            api.error({
                message: 'Error',
                description: 'Terjadi Kesalahan',
                placement: 'topRight'
            })
        }
        if (type === 'success') {
            api.success({
                message: 'Success',
                description: 'Welcome Joen Doe',
                placement: 'topRight'
            })
        }

    }

    const onSubmit = (loginData: TForgotPassword) => {


        sendEmailForgotPassword(loginData)

    };
    return (
        <LoginLayout title='Forgot Password'>
            {contextHolder}
            <Space size={16} direction="vertical" style={{ backgroundColor: 'white', width: '100%', alignItems: 'center', paddingTop: '4rem' }}>
                <Typography.Title>Ant Design</Typography.Title>
                <Typography.Text style={{ opacity: .5 }}>Ant Design is the most influential web design specification in Xihu district</Typography.Text>
            </Space>
            <Form
                form={form}
                name="basic"
                labelCol={{ span: 4 }}
                wrapperCol={{ offset: 4, span: 16 }}
                labelAlign='left'
                initialValues={{ remember: true }}
                autoComplete="off"
                style={{ backgroundColor: 'white', padding: '4rem', }}
                onFinish={onSubmit}
            >

                <Form.Item
                    name="email"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input placeholder='Email' prefix={<UserOutlined />} />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 4, span: 16 }}
                    validateStatus="error"
                    help={props?.error?.message}>
                    <Button type="primary" htmlType="submit" style={{ width: '100%' }} >
                        Send
                    </Button>
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
                    <Link href='/auth/login'>Back to Login Admin?</Link>
                </Form.Item>
            </Form>

        </LoginLayout>
    )
}

export default ForgotPassword;
