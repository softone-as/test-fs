import React, { useState } from 'react';

import Layout from '../../../Layouts/Main';

import { PERMISSION_BACKOFFICE_UPDATE_PERMISSION } from '../../../../../../constants/permission.constant';

import TextBox from '../../../Components/atoms/Box/TextBox.atom';
import Container from '../../../Components/atoms/Containers/Container.atom';
import HeaderText from '../../../Components/molecules/Text/HeaderText.molecule';
import ActionButtons from '../../../Components/molecules/DataTable/ActionButtons.molecule';
import { EndpointRoute, Route } from '../../../Enums/Route';
import { Link, usePage } from '@inertiajs/inertia-react';
import { PermissionResponse } from '../../../../src/modules/iam/responses/permission.response';

type PermissionDetailPageProps = {
    data: PermissionResponse;
};

const PermissionDetailPage: React.FC<PermissionDetailPageProps> = ({ data }) => {
    const id = data?.id;
    const { userDetail } = usePage().props
    const permissionList = userDetail['role'].permissions.map(permission => permission.key)

    const roleList = data.roles.map((role) => {
        return (
            <li key={role.id} >
                <Link href={`${EndpointRoute.Role}/${role.id}`}>{role.name}</Link>
            </li>
        )
    })

    return (
        <Layout title={data.name}>
            <div className="page__center">
                <HeaderText title="Detail Permission" />
                <Container>
                    <ActionButtons
                        position="flex-end"
                        updateLink={`${Route.EditPermission}/${id}`}
                        onDelete={null}
                        hideDelete={true}
                        hideUpdate={!permissionList.includes(PERMISSION_BACKOFFICE_UPDATE_PERMISSION)}
                    />
                    <div
                        className="row align-items-start gy-2"
                        style={{ margin: '20px' }}
                    >
                        <TextBox title="ID Permission" content={data.id} />
                        <TextBox
                            title="Nama Permission"
                            content={data.name}
                        />
                        <TextBox
                            isFull={true}
                            title="Key Permission"
                            content={data.key}
                        />
                        <TextBox
                            isFull={true}
                            title="In Roles"
                            content={
                                <ul>
                                    {roleList}
                                </ul>
                            }
                        />
                    </div>
                </Container>
            </div>
        </Layout>
    );
};

export default PermissionDetailPage;
