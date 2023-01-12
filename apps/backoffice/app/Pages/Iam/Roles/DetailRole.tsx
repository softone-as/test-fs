import React, { useState } from 'react';

import Layout from '../../../Layouts/Main';

import {
    PERMISSION_BACKOFFICE_DELETE_ROLE,
    PERMISSION_BACKOFFICE_UPDATE_ROLE
} from '../../../../../../constants/permission.constant';

import TextBox from '../../../Components/atoms/Box/TextBox.atom';
import Container from '../../../Components/atoms/Containers/Container.atom';
import HeaderText from '../../../Components/molecules/Text/HeaderText.molecule';
import ActionButtons from '../../../Components/molecules/DataTable/ActionButtons.molecule';
import { EndpointRoute, Route } from '../../../Enums/Route';
import { confirmDelete, notifyError, notifySuccess } from '../../../Utils/utils';
import { Inertia } from '@inertiajs/inertia';
import { ErrorType, SuccessType } from '../../../modules/Common/Entity/Common';
import { Link, usePage } from '@inertiajs/inertia-react';
import { RoleResponse } from '../../../../src/modules/iam/responses/role.response';

type RoleDetailPageProps = {
    data: RoleResponse;
};

const RoleDetailPage: React.FC<RoleDetailPageProps> = ({ data }) => {
    const id = data?.id;
    const { userDetail } = usePage().props
    const permissionAllowActionList = userDetail['role'].permissions.map(permission => permission.key)

    const handleDeleteRole = (id: string) => {
        if (confirmDelete()) {
            Inertia.get(`${EndpointRoute.DeleteRole}/${id}`, {}, {
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

    const permissionList = data.permissions.map((permission) => {
        return (
            <li key={permission.id} >
                <Link href={`${EndpointRoute.Permission}/${permission.id}`}>{permission.name}</Link>
            </li>
        )
    })

    return (
        <Layout title={data.name}>
            <div className="page__center">
                <HeaderText title="Detail Role" />
                <Container>
                    <ActionButtons
                        position="flex-end"
                        updateLink={`${Route.EditRole}/${id}`}
                        onDelete={() => handleDeleteRole(id.toString())}
                        hideDelete={!permissionAllowActionList.includes(PERMISSION_BACKOFFICE_DELETE_ROLE)}
                        hideUpdate={!permissionAllowActionList.includes(PERMISSION_BACKOFFICE_UPDATE_ROLE)}
                    />
                    <div
                        className="row align-items-start gy-2"
                        style={{ margin: '20px' }}
                    >
                        <TextBox title="ID Role" content={data.id} />
                        <TextBox
                            title="Nama Role"
                            content={data.name}
                        />
                        <TextBox
                            isFull={true}
                            title="Key Role"
                            content={data.key}
                        />
                        <TextBox
                            isFull={true}
                            title="Has Permissions"
                            content={
                                <ul>
                                    {permissionList}
                                </ul>
                            }
                        />
                    </div>
                </Container>
            </div>
        </Layout>
    );
};

export default RoleDetailPage;
