/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { usePage } from '@inertiajs/inertia-react';

import { EndpointRoute } from '../../Enums/Route';

import Layout from '../../Layouts/Main';

import {
    FormConfigType,
} from '../../modules/Config/Entity/Config';
import {
    ErrorType,
    SuccessType,
} from '../../modules/Common/Entity/Common';

import { notifySuccess, setServerError } from '../../Utils/utils';

import Form from '../../Components/molecules/Form/Form.molecule';
import ControlledTextInput from '../../Components/molecules/ControlledInputs/ControlledTextInput.molecule';
import useLoading from '../../modules/Hook/useLoading';
import { ConfigResponse } from '../../../src/modules/config/responses/config.response';

type FormConfigProps = {
    data: ConfigResponse;
    isUpdate?: boolean;
    id: number;
};

const schema = yup.object().shape({
    name: yup.string().required('Field Nama Config wajib diisi'),
    key: yup.string().required('Field Harga wajib diisi'),
    value: yup.string().required('Field Icon wajib diisi'),
});

const FormConfig: React.FC<FormConfigProps> = ({
    id,
    data,
    isUpdate = false,
}) => {
    const { isLoading, setIsLoading } = useLoading();

    const {
        handleSubmit,
        control,
        setError,
        formState: { isValid },
    } = useForm<FormConfigType>({
        mode: 'onChange',
        resolver: yupResolver(schema),
        defaultValues: {
            ...data
        },
    });

    const onSubmit = handleSubmit((config) => {
        setIsLoading(true);
        if (isUpdate) {
            return Inertia.post(
                `${EndpointRoute.EditConfig}/${id}`,
                config,
                {
                    onSuccess: (success) => {
                        const message = (success.props.success as SuccessType)
                            ?.message;
                        notifySuccess(message);
                        setIsLoading(false);
                    },
                    onError: (_) => {
                        setIsLoading(false);
                    }
                },
            );
        }
    });

    const error = usePage().props.error as ErrorType;

    React.useEffect(() => {
        setServerError(error, setError);
    }, [error]);

    const title = isUpdate ? 'Update Config' : 'Buat Config Baru';

    return (
        <Layout title={title}>
            <Form
                title={title}
                onSubmit={onSubmit}
                isValid={isValid}
                isLoading={isLoading}
            >
                <ControlledTextInput
                    title="Nama Config"
                    name="name"
                    placeholder="Masukkan Nama Config"
                    control={control}
                />

                <ControlledTextInput
                    title="Key"
                    disabled={true}
                    name="key"
                    placeholder="Masukkan Value Config"
                    control={control}
                />

                <ControlledTextInput
                    title="Nama Config"
                    name="value"
                    placeholder="Masukkan Value Config"
                    control={control}
                />

            </Form>
        </Layout>
    );
};

export default FormConfig;
