/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
import * as yup from 'yup';
import React from 'react';
import { Form, Checkbox, Button, Input, Typography, Space, notification } from 'antd'
import { LoginLayout } from '../Layouts';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Inertia } from '@inertiajs/inertia';
// import { yupResolver } from '@hookform/resolvers/yup';
// import { useForm } from 'react-hook-form';
import { usePage } from '@inertiajs/inertia-react';

// import { Blank } from '../Layouts/Blank';

// import { SuccessType } from '../modules/Common/Entity/Common';
import { LoginType } from '../modules/User/Entity/User';

import { EndpointRoute } from '../Enums/Route';

// import { notifySuccess, setServerError } from '../Utils/utils';

// import Form from '../Components/molecules/Form/Form.molecule';
// import ControlledTextInput from '../Components/molecules/ControlledInputs/ControlledTextInput.molecule';
import useLoading from '../modules/Hook/useLoading';
import { ErrorType } from '../modules/Common/Entity/Common';

const schema = yup.object().shape({
    email: yup
        .string()
        .email('Field Email wajib berformat email')
        .required('Field Email wajib diisi'),
    password: yup.string().required('Field Password wajib diisi'),
});
// import OneSignal from 'react-onesignal';

// const Login = (): JSX.Element => {
//     const { isLoading, setIsLoading } = useLoading();

//     const {
//         handleSubmit,
//         control,
//         setError,
//         formState: { isValid },
//     } = useForm<LoginType>({
//         mode: 'onChange',
//         resolver: yupResolver(schema),
//     });

//     const onSubmit = handleSubmit((loginData) => {
//         setIsLoading(true);

//         // Not Used
//         // OneSignal.getUserId().then((playerId) => {
//         Inertia.post(EndpointRoute.AdminLogin + `?one_signal_player_id=`, loginData, {
//             onError: (_) => {
//                 setIsLoading(false);
//             },
//             onSuccess: (success) => {
//                 const message = (success.props.success as SuccessType)
//                     ?.message;
//                 notifySuccess(message);
//                 setIsLoading(false);
//             },
//         });
//         // })
//     });

//     const error = usePage().props.error as ErrorType;

//     React.useEffect(() => {
//         setServerError(error, setError);
//     }, [error]);

//     return (
//         <Blank title="Login">
//             <div className="login__container page__center">
//                 <div className="page__center">
//                     <img
//                         className="login__company__logo"
//                         src="/unity/img/logo.png"
//                     />
//                 </div>

//                 <Form
//                     buttonTitle="Login"
//                     title="Login"
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

//                     <ControlledTextInput
//                         title="Password"
//                         name="password"
//                         placeholder="Input Password"
//                         control={control}
//                         type="password"
//                     />

//                 </Form>
//             </div>

//             <div className="page__center">
//                 <br />
//                 <br />
//                 <Link href={EndpointRoute.ForgotPassword}>Forgot Password ?</Link>
//             </div>
//         </Blank>
//     );
// };


const Login = () => {

    const [form] = Form.useForm<LoginType>()

    const [api, contextHolder] = notification.useNotification()

    const { isLoading, setIsLoading } = useLoading();

    const openNotification = (type: string) => {
        if (type === 'error') {
            api.success({
                message: 'Success',
                description: 'Welcome Joen Doe',
                placement: 'topRight'
            })
        }
        if (type === 'success') {
            api.error({
                message: 'Success',
                description: 'Welcome Joen Doe',
                placement: 'topRight'
            })
        }

    }

    const error = usePage().props.error as ErrorType;

    const onSubmit = (loginData: LoginType) => {
        console.log('LOGIN DATA ', loginData)
        setIsLoading(true);


        // Not Used
        // OneSignal.getUserId().then((playerId) => {
        Inertia.post(EndpointRoute.AdminLogin + `?one_signal_player_id=`, loginData, {
            onError: (_) => {
                setIsLoading(false);
            },
            onSuccess: (success) => {
                console.log('Success ', success)
                // const message = (success.props.success as SuccessType)
                //     ?.message;
                // notifySuccess(message);
                setIsLoading(false);
                if (error.statusCode !== 400) {
                    openNotification('error')
                } else {
                    openNotification('success')
                }
            },
        })
    };



    // useEffect(() => {
    //     if (error.message) {
    //         form.se
    //     }
    // }, [error])
    return (
        <LoginLayout title='Login'>
            {contextHolder}
            <Space size={16} direction="vertical" style={{ backgroundColor: 'white', width: '100%', alignItems: 'center', paddingTop: '4rem' }}>
                <Typography.Title>Ant Design</Typography.Title>
                <Typography.Text style={{ opacity: .5 }}>Ant Design is the most influential web design specification in Xihu district</Typography.Text>
            </Space>
            <Form
                form={form}
                name="basic"
                labelCol={{ span: 4, }}
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
                    <Input placeholder='Username' prefix={<UserOutlined />} />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                    validateStatus={error?.message && "error"}
                    help={error?.message}
                >
                    <Input.Password placeholder='Password' prefix={<LockOutlined />} />
                </Form.Item>
                <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 4, span: 8 }}>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
                    <Button type="primary" htmlType="submit" style={{ width: '100%' }} loading={isLoading} >
                        Login
                    </Button>
                </Form.Item>
            </Form>
        </LoginLayout >
    )
}
export default Login;
