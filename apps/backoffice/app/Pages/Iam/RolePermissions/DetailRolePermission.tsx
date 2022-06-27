import React, { useState } from 'react';

import Layout from '../../../Layouts/Main';

import { RolePermissionType } from '../../../modules/RolePermission/Entity/RolePermission';
import { PERMISSION_BACKOFFICE_DELETE_ROLE_PERMISSION, PERMISSION_BACKOFFICE_UPDATE_ROLE_PERMISSION } from '../../../modules/Permission/Entity/Permission';

import TextBox from '../../../Components/atoms/Box/TextBox.atom';
import Container from '../../../Components/atoms/Containers/Container.atom';
import HeaderText from '../../../Components/molecules/Text/HeaderText.molecule';
import ActionButtons from '../../../Components/molecules/DataTable/ActionButtons.molecule';
import { EndpointRoute, Route } from '../../../Enums/Route';
import { confirmDelete, notifyError, notifySuccess } from '../../../Utils/utils';
import { Inertia } from '@inertiajs/inertia';
import { ErrorType, SuccessType } from 'apps/backoffice/app/modules/Common/Entity/Common';
import { usePage } from '@inertiajs/inertia-react';

type RolePermissionDetailPageProps = {
    data: RolePermissionType;
};

const RolePermissionDetailPage: React.FC<RolePermissionDetailPageProps> = ({ data }) => {
    const id = data?.id;
    const { userDetail } = usePage().props
    const permissionList = userDetail['role'].permissions.map(permission => permission.key)

    const handleDeleteRolePermission = (id: string) => {
        if (confirmDelete()) {
            Inertia.get(`${EndpointRoute.DeleteUser}/${id}`, {}, {
                onSuccess: (res) => {
                    const error = res.props['error'] || null
                    const success = res.props['success'] || null

                    if (success) {
                        const message = (res.props.success as SuccessType)
                            .message;
                        notifySuccess(message);
                    } else if (error) {
                        const message = (res.props.error as ErrorType)
                            .message;
                        notifyError(message);
                    }
                },
            });
        }
    };
    return (
        <Layout title={data.role?.name + " can do " + data.permission?.name}>
            <div className="page__center">
                <HeaderText title="Detail Role Permission" />
                <Container>
                    <ActionButtons
                        position="flex-end"
                        updateLink={`${Route.EditRolePermission}/${id}`}
                        onDelete={() => handleDeleteRolePermission(id)}
                        hideDelete={!permissionList.includes(PERMISSION_BACKOFFICE_DELETE_ROLE_PERMISSION)}
                        hideUpdate={!permissionList.includes(PERMISSION_BACKOFFICE_UPDATE_ROLE_PERMISSION)}
                    />
                    <div
                        className="row align-items-start gy-2"
                        style={{ margin: '20px' }}
                    >
                        <TextBox title="ID RolePermission" content={data.id} />
                        <TextBox
                            title="Role"
                            content={data.role.name}
                        />
                        <TextBox
                            title="Permission"
                            content={data.permission.name}
                        />
                    </div>
                </Container>
            </div>
        </Layout>
    );
};

export default RolePermissionDetailPage;
