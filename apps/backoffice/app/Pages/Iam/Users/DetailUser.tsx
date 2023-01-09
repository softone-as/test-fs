import React, { useState } from 'react';

import Layout from '../../../Layouts/Main';

import {
    PERMISSION_BACKOFFICE_DELETE_USER,
    PERMISSION_BACKOFFICE_UPDATE_USER
} from '../../../../../../constants/permission.constant';
import { UserType } from '../../../modules/User/Entity/User';

import TextBox from '../../../Components/atoms/Box/TextBox.atom';
import Container from '../../../Components/atoms/Containers/Container.atom';
import HeaderText from '../../../Components/molecules/Text/HeaderText.molecule';
import ActionButtons from '../../../Components/molecules/DataTable/ActionButtons.molecule';
import { EndpointRoute, Route } from '../../../Enums/Route';
import { confirmDelete, formatCurrency, notifyError, notifySuccess } from '../../../Utils/utils';
import { Inertia } from '@inertiajs/inertia';
import { ErrorType, SuccessType } from '../../../modules/Common/Entity/Common';
import { Link, usePage } from '@inertiajs/inertia-react';

type UserDetailPageProps = {
    data: UserType;
};

const UserDetailPage: React.FC<UserDetailPageProps> = ({ data }) => {
    const id = data?.id;
    const { userDetail } = usePage().props
    const permissionAllowActionList = userDetail['role'].permissions.map(permission => permission.key)

    const handleDeleteUser = (id: string) => {
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

    const permissionList = data?.role.permissions.map((permission) => {
        return (
            <li key={permission.id} >
                <Link href={`${EndpointRoute.Permission}/${permission.id}`}>{permission.name}</Link>
            </li>
        )
    })


    return (
        <Layout title={data.fullname}>
            <div className="page__center">
                <HeaderText title="Detail User" />
                <Container>
                    <ActionButtons
                        position="flex-end"
                        updateLink={`${Route.EditUser}/${id}`}
                        onDelete={() => handleDeleteUser(id)}
                        hideDelete={!permissionAllowActionList.includes(PERMISSION_BACKOFFICE_DELETE_USER)}
                        hideUpdate={!permissionAllowActionList.includes(PERMISSION_BACKOFFICE_UPDATE_USER)}
                    />
                    <div
                        className="row align-items-start gy-2"
                        style={{ margin: '20px' }}
                    >
                        <TextBox title="ID User" content={data.id} />
                        <TextBox
                            title="Nama User"
                            content={data.fullname}
                        />
                        <TextBox
                            title="Phone Number"
                            content={data.phoneNumber}
                        />
                        <TextBox
                            title="Address"
                            content={data.userAddresses[0]?.address}
                        />
                        <TextBox
                            title="Role"
                            content={<Link href={`${EndpointRoute.Role}/${data.role.id}`}>{data.role.name}</Link>}
                        />
                        <TextBox
                            title="Poin IDR"
                            content={formatCurrency(data.poin)}
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

export default UserDetailPage;
