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
    RolePermissionType,
    FormRolePermissionType,
} from '../../../modules/RolePermission/Entity/RolePermission';

import {
    RoleType
} from '../../../modules/Role/Entity/Role';

import {
    PermissionType,
} from '../../../modules/Permission/Entity/Permission';

import {
    ErrorType,
    SuccessType,
} from '../../../modules/Common/Entity/Common';

import { notifySuccess, setServerError } from '../../../Utils/utils';

import Form from '../../../Components/molecules/Form/Form.molecule';
import ControlledSelect from '../../../Components/molecules/ControlledInputs/ControlledSelect.molecule';
import useLoading from '../../../modules/Hook/useLoading';

type FormRolePermissionProps = {
    data: RolePermissionType;
    roles: RoleType[];
    permissions: PermissionType[];
    isUpdate?: boolean;
    id: number;
};

const schema = yup.object().shape({
    roleId: yup.string().required('Field Role wajib diisi'),
    permissionId: yup.string().required('Field Permission wajib diisi')
});

const FormRolePermission: React.FC<FormRolePermissionProps> = ({
    id,
    roles,
    permissions,
    data,
    isUpdate = false,
}) => {
    const { isLoading, setIsLoading } = useLoading();

    const {
        handleSubmit,
        control,
        setError,
        formState: { isValid },
    } = useForm<FormRolePermissionType>({
        mode: 'onChange',
        resolver: yupResolver(schema),
        defaultValues: {
            ...data, roleId: data?.role.id.toString(), permissionId: data?.permission.id.toString()
        },
    });

    const onSubmit = handleSubmit((rolePermission) => {
        setIsLoading(true);
        if (isUpdate) {
            return Inertia.post(
                `${EndpointRoute.EditRolePermission}/${id}`,
                {
                    role_id: rolePermission.roleId,
                    permission_id: rolePermission.permissionId,
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
                    }
                },
            );
        }
        return Inertia.post(EndpointRoute.CreateRolePermission, {
            role_id: rolePermission.roleId,
            permission_id: rolePermission.permissionId,
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

    const permissionList = React.useMemo(() => {
        return permissions?.map((permission) => {
            return {
                value: permission.id,
                label: permission.name,
            };
        });
    }, []);

    const error = usePage().props.error as ErrorType;

    React.useEffect(() => {
        setServerError(error, setError);
    }, [error]);

    const title = isUpdate ? 'Update Role Permission' : 'Buat Role Permission Baru';

    return (
        <Layout title={title}>
            <Form
                title={title}
                onSubmit={onSubmit}
                isValid={isValid}
                isLoading={isLoading}
            >
                <ControlledSelect
                    title="Pilih Role"
                    name="roleId"
                    options={roleList}
                    placeholder="Pilih Category"
                    control={control}
                />

                <ControlledSelect
                    title="Pilih Permission"
                    name="permissionId"
                    options={permissionList}
                    placeholder="Pilih Category"
                    control={control}
                />

            </Form>
        </Layout>
    );
};

export default FormRolePermission;
