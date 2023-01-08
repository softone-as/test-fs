/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
import * as yup from 'yup';
import React from 'react';
import { Inertia } from '@inertiajs/inertia';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Link, usePage } from '@inertiajs/inertia-react';

import { Blank } from '../Layouts/Blank';

import { ErrorType, SuccessType } from '../modules/Common/Entity/Common';
import { LoginType } from '../modules/User/Entity/User';

import { EndpointRoute } from '../Enums/Route';

import { notifySuccess, setServerError } from '../Utils/utils';

import Form from '../Components/molecules/Form/Form.molecule';
import ControlledTextInput from '../Components/molecules/ControlledInputs/ControlledTextInput.molecule';
import useLoading from '../modules/Hook/useLoading';

const schema = yup.object().shape({
    email: yup
        .string()
        .email('Field Email wajib berformat email')
        .required('Field Email wajib diisi'),
    password: yup.string().required('Field Password wajib diisi'),
});
// import OneSignal from 'react-onesignal';

const Login = (): JSX.Element => {
    const { isLoading, setIsLoading } = useLoading();

    const {
        handleSubmit,
        control,
        setError,
        formState: { isValid },
    } = useForm<LoginType>({
        mode: 'onChange',
        resolver: yupResolver(schema),
    });

    const onSubmit = handleSubmit((loginData) => {
        setIsLoading(true);

        // Not Used
        // OneSignal.getUserId().then((playerId) => {
        Inertia.post(EndpointRoute.AdminLogin + `?one_signal_player_id=`, loginData, {
            onError: (_) => {
                setIsLoading(false);
            },
            onSuccess: (success) => {
                const message = (success.props.success as SuccessType)
                    ?.message;
                notifySuccess(message);
                setIsLoading(false);
            },
        });
        // })
    });

    const error = usePage().props.error as ErrorType;

    React.useEffect(() => {
        setServerError(error, setError);
    }, [error]);

    return (
        <Blank title="Login">
            <div className="login__container page__center">
                <div className="page__center">
                    <img
                        className="login__company__logo"
                        src="/unity/img/logo.png"
                    />
                </div>

                <Form
                    buttonTitle="Login"
                    title="Login"
                    onSubmit={onSubmit}
                    isValid={isValid}
                    isLoading={isLoading}
                >
                    <ControlledTextInput
                        title="Email"
                        name="email"
                        placeholder="Input email"
                        control={control}
                    />

                    <ControlledTextInput
                        title="Password"
                        name="password"
                        placeholder="Input Password"
                        control={control}
                        type="password"
                    />

                </Form>
            </div>

            <div className="page__center">
                <br />
                <br />
                <Link href={EndpointRoute.ForgotPassword}>Forgot Password ?</Link>
            </div>
        </Blank>
    );
};

export default Login;
