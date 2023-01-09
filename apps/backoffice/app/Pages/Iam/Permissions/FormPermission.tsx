/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { usePage } from '@inertiajs/inertia-react';

import { EndpointRoute } from '../../../Enums/Route';

import Layout from '../../../Layouts/Main';

import {
    PermissionType,
    FormPermissionType,
} from '../../../modules/Permission/Entity/Permission';

import {
    ErrorType,
    SuccessType,
} from '../../../modules/Common/Entity/Common';

import { notifySuccess, setServerError } from '../../../Utils/utils';

import Form from '../../../Components/molecules/Form/Form.molecule';
import ControlledTextInput from '../../../Components/molecules/ControlledInputs/ControlledTextInput.molecule';
import useLoading from '../../../modules/Hook/useLoading';

type FormPermissionProps = {
    data: PermissionType;
    isUpdate?: boolean;
    id: number;
};

const schema = yup.object().shape({
    name: yup.string().required('Field Nama Permission wajib diisi')
});

const FormPermission: React.FC<FormPermissionProps> = ({
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
    } = useForm<FormPermissionType>({
        mode: 'onChange',
        resolver: yupResolver(schema),
        defaultValues: {
            ...data,
        },
    });

    const onSubmit = handleSubmit((permission) => {
        setIsLoading(true);
        if (isUpdate) {
            return Inertia.post(
                `${EndpointRoute.EditPermission}/${id}`,
                permission,
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

    const title = isUpdate ? 'Update Permission' : 'Buat Permission Baru';

    return (
        <Layout title={title}>
            <Form
                title={title}
                onSubmit={onSubmit}
                isValid={isValid}
                isLoading={isLoading}
            >
                <ControlledTextInput
                    title="Nama Lengkap"
                    name="name"
                    placeholder="Masukkan Nama"
                    control={control}
                />

                <ControlledTextInput
                    title="No Key"
                    name="key"
                    placeholder="Masukkan Key"
                    control={control}
                    disabled={isUpdate}
                />

            </Form>
        </Layout>
    );
};

export default FormPermission;
