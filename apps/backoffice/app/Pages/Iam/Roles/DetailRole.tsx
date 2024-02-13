import { Descriptions, Space } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { DataTable } from 'apps/backoffice/app/Components/organisms/DataTable';
import React, { useState } from 'react';

import DescriptionContainer from '../../../Components/molecules/DescriptionContainer/DescriptionContainer';
import { Section } from '../../../Components/molecules/Section';
import { Breadcrumbs } from '../../../Common/Enums/Breadcrumb';
import { MainLayout } from '../../../Layouts/MainLayout';
import { defaultSizeSpace } from '../../../Utils/theme';
import { TCRoleDetailProps } from 'apps/backoffice/@contracts/iam/role/role-detail.contract';
import { TInertiaPage } from 'apps/backoffice/app/Modules/Common/Entities';
import { TCUserIndexProps } from 'apps/backoffice/@contracts/iam/user/user-index.contract';
import { TCRoleIndexProps } from 'apps/backoffice/@contracts/iam/role/role-index.contract';

const PermissionColumns: ColumnsType<TCRoleIndexProps['data'][number]> = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Permission Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'key',
        dataIndex: 'key',
        key: 'key',
    },
];

const UserColumn: ColumnsType<TCUserIndexProps['data'][number]> = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Full Name',
        dataIndex: 'fullname',
        key: 'fullname',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
];

const DetailRolePage: TInertiaPage<TCRoleDetailProps> = (props) => {
    const { key, name, id, permissions } = props.data;

    const [dataPermission, setDataPermission] = useState(permissions);
    const [dataUser, setDataUser] = useState(props.data.users);

    const filterDataPermission = (value: string): void => {
        const filteredData = dataPermission?.filter(
            (entry) =>
                entry.name.toLowerCase().includes(value.toLowerCase()) ||
                entry.key.toLowerCase().includes(value.toLowerCase()),
        );
        setDataPermission(filteredData);
    };

    const filterDataUser = (value: string): void => {
        const filteredData = dataUser?.filter(
            (entry) =>
                entry.fullname.toLowerCase().includes(value.toLowerCase()) ||
                entry.email.toLowerCase().includes(value.toLowerCase()),
        );
        setDataUser(filteredData);
    };

    return (
        <MainLayout title="Detail Role" breadcrumbs={Breadcrumbs.Roles.DETAIL}>
            <Space
                direction="vertical"
                size={defaultSizeSpace}
                style={{ width: '100%' }}
            >
                <Section title="Role Info">
                    <DescriptionContainer size="small" bordered column={1}>
                        <Descriptions.Item label="ID">{id}</Descriptions.Item>
                        <Descriptions.Item label="Name">
                            {name}
                        </Descriptions.Item>
                        <Descriptions.Item label="Key">{key}</Descriptions.Item>
                    </DescriptionContainer>
                </Section>

                <Section title="Permissions">
                    <DataTable
                        columns={PermissionColumns}
                        dataSource={dataPermission}
                        rowKey="id"
                        onChange={(e): void => {
                            e.search && filterDataPermission(e.search);
                        }}
                    />
                </Section>

                <Section title="Users">
                    <DataTable
                        columns={UserColumn}
                        dataSource={dataUser}
                        rowKey="id"
                        onChange={(e): void => {
                            e.search && filterDataUser(e.search);
                        }}
                    />
                </Section>
            </Space>
        </MainLayout>
    );
};

export default DetailRolePage;
