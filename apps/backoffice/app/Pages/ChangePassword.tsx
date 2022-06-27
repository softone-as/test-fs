/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
import * as yup from 'yup';
import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Link, usePage } from '@inertiajs/inertia-react';

import Blank from '../Layouts/Blank';

import { ErrorType, SuccessType } from '../modules/Common/Entity/Common';
import { ChangePasswordType } from '../modules/User/Entity/User';

import { EndpointRoute } from '../Enums/Route';

import { notifySuccess, setServerError } from '../Utils/utils';

import Form from '../Components/molecules/Form/Form.molecule';
import ControlledTextInput from '../Components/molecules/ControlledInputs/ControlledTextInput.molecule';
import useLoading from '../modules/Hook/useLoading';

const schema = yup.object().shape({
    password: yup
        .string()
        .required('Field Email wajib diisi'),
    retypePassword: yup.string()
        .when('password', (password, schema) => {
            return schema.test({
                test: retypePassword => password == retypePassword,
                message: "Should be same value"
            })
        })
});

const ForgotPassword = (): JSX.Element => {
    const { isLoading, setIsLoading } = useLoading();

    const {
        handleSubmit,
        control,
        setError,
        formState: { isValid },
    } = useForm<ChangePasswordType>({
        mode: 'onChange',
        resolver: yupResolver(schema),
    });

    const onSubmit = handleSubmit((forgotPassword) => {
        setIsLoading(true);
        const queryParams = new URLSearchParams(window.location.search);

        const [isDisableTable, setDisableTable] = useState(false);
        Inertia.post(`${EndpointRoute.ConfirmForgotPassword + "?email=" + queryParams.get('email') + "&otp_code=" + queryParams.get('otp_code')}`,
            {
                password: forgotPassword.password
            },
            {
                onError: (_) => {
                    setIsLoading(false);
                },
                onSuccess: (success) => {
                    const message = (success.props.success as SuccessType)
                        ?.message;
                    notifySuccess(message);
                    setIsLoading(false);
                },
            })
    });

    const error = usePage().props.error as ErrorType;

    React.useEffect(() => {
        setServerError(error, setError);
    }, [error]);

    return (
        <Blank title="Change Password">
            <div className="login__container page__center">
                <div className="page__center">
                    <img
                        className="login__company__logo"
                        src="/unity/img/logo.png"
                    />
                </div>

                <Form
                    buttonTitle="Submit"
                    title="Change Password"
                    onSubmit={onSubmit}
                    isValid={isValid}
                    isLoading={isLoading}
                >
                    <ControlledTextInput
                        title="Password"
                        name="password"
                        placeholder="Input Password"
                        control={control}
                        type="password"
                    />

                    <ControlledTextInput
                        title="Retype Password"
                        name="retypePassword"
                        placeholder="Retype Password"
                        control={control}
                        type="password"
                    />


                </Form>
            </div>

            <div className="page__center">
                <br />
                <br />
                <Link href={EndpointRoute.AdminLogin}>Back to Login Admin ?</Link>
            </div>
        </Blank>
    );
};

export default ForgotPassword;
