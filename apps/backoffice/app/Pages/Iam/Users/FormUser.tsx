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
    UserType,
    FormUserType,
} from '../../../modules/User/Entity/User';
import {
    ErrorType,
    SuccessType,
} from '../../../modules/Common/Entity/Common';

import { notifySuccess, setServerError } from '../../../Utils/utils';

import Form from '../../../Components/molecules/Form/Form.molecule';
import ControlledTextInput from '../../../Components/molecules/ControlledInputs/ControlledTextInput.molecule';
import useLoading from '../../../modules/Hook/useLoading';
import { RoleType } from '../../..//modules/Role/Entity/Role';
import ControlledSelect from '../../../Components/molecules/ControlledInputs/ControlledSelect.molecule';

type FormUserProps = {
    data: Omit<UserType, 'password'>;
    roles: Omit<RoleType, 'permissions'>[];
    isUpdate?: boolean;
    id: string;
};

const schema = yup.object().shape({
    fullname: yup.string().required('Field Nama wajib diisi'),
    email: yup
        .string()
        .required('Field Email User wajib diisi'),
    phoneNumber: yup.string().required('Field Phon Number Telpon wajib diisi'),
    roleId: yup.string().required('Field Role wajib diisi'),
});

const FormUser: React.FC<FormUserProps> = ({
    id,
    data,
    roles,
    isUpdate = false,
}) => {
    const { isLoading, setIsLoading } = useLoading();

    const {
        handleSubmit,
        control,
        setError,
        formState: { isValid },
    } = useForm<FormUserType>({
        mode: 'onChange',
        resolver: yupResolver(schema),
        defaultValues: {
            ...data, roleId: data?.role.id, password: null
        },
    });

    const onSubmit = handleSubmit((user) => {
        setIsLoading(true);
        if (isUpdate) {
            return Inertia.post(
                `${EndpointRoute.EditUser}/${id}`,
                {
                    fullname: user.fullname,
                    email: user.email,
                    password: user.password,
                    phoneNumber: user.phoneNumber,
                    roleId: user.roleId,
                },
                {
                    onSuccess: (success) => {
                        const message = (success.props.success as SuccessType)
                            ?.message;
                        notifySuccess(message);
                        setIsLoading(false);
                    },
                    onError: (_) => {
                        setIsLoading(false);
                    },
                },
            );
        }
        return Inertia.post(EndpointRoute.CreateUser,
            {
                fullname: user.fullname,
                email: user.email,
                password: user.password,
                phoneNumber: user.phoneNumber,
                roleId: user.roleId,
            }, {
            onSuccess: (success) => {
                const message = (success.props.success as SuccessType)?.message;
                notifySuccess(message);
                setIsLoading(false);
            },
            onError: (_) => {
                setIsLoading(false);
            }
        });
    });

    const roleList = React.useMemo(() => {
        return roles?.map((role) => {
            return {
                value: role.id,
                label: role.name,
            };
        });
    }, []);

    const error = usePage().props.error as ErrorType;

    React.useEffect(() => {
        setServerError(error, setError);
    }, [error]);

    const title = isUpdate ? 'Update User' : 'Buat User Baru';

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
                    name="fullname"
                    placeholder="Masukkan Nama"
                    control={control}
                />

                <ControlledSelect
                    title="Pilih Role"
                    name="roleId"
                    options={roleList}
                    placeholder="Pilih Role"
                    control={control}
                />

                <ControlledTextInput
                    title="No Telepon"
                    name="phoneNumber"
                    placeholder="Masukkan No"
                    type='number'
                    control={control}
                />

                <ControlledTextInput
                    title="Email"
                    name="email"
                    placeholder="Masukkan Email"
                    control={control}
                />

                <ControlledTextInput
                    title="Password"
                    name="password"
                    placeholder="Masukkan Password"
                    type='password'
                    control={control}
                />


            </Form>
        </Layout>
    );
};

export default FormUser;
