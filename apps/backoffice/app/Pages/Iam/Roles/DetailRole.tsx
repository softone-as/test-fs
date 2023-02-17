import { Descriptions, Space } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { DataTable } from 'apps/backoffice/app/Components/organisms/DataTable';
import { useTableFilter } from 'apps/backoffice/app/Utils/hooks';
import { IPermission } from 'interface-models/iam/permission.interface';
import { IRole } from 'interface-models/iam/role.interface';
import { IUser } from 'interface-models/iam/user.interface';
import React from 'react';

import DescriptionContainer from '../../../Components/molecules/DescriptionContainer/DescriptionContainer';
import { Section } from '../../../Components/molecules/Section';
import { Breadcrumbs } from '../../../Enums/Breadcrumb';
import { MainLayout } from '../../../Layouts/MainLayout';
import { TInertiaProps } from '../../../Modules/Inertia/Entities';
import { defaultSizeSpace } from '../../../Utils/theme';

interface IProps extends TInertiaProps {
    data: IRole;
    users: IUser[];
}

const PermissionColumns: ColumnsType<IPermission> = [
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

const UserColumn: ColumnsType<IUser> = [
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

const DetailRolePage: React.FC = (props: IProps) => {
    const { key, name, id, permissions } = props.data;
    const users = props.users;

    const {
        setQueryParams,
        filters,
        status: { isFetching },
    } = useTableFilter();
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
                    <DataTable<IPermission>
                        columns={PermissionColumns}
                        dataSource={permissions}
                        onChange={setQueryParams}
                        search={filters.search}
                        loading={isFetching}
                        rowKey="id"
                    />
                </Section>

                <Section title="Users">
                    <DataTable<IUser>
                        columns={UserColumn}
                        dataSource={users}
                        onChange={setQueryParams}
                        search={filters.search}
                        loading={isFetching}
                        rowKey="id"
                    />
                </Section>
            </Space>
        </MainLayout>
    );
};

export default DetailRolePage;
