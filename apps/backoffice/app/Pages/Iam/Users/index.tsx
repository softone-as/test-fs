import React from 'react';
import { DataTable, sortOrder } from '../../../Components/organisms/DataTable';
import { MainLayout } from '../../../Layouts/MainLayout';
import type { ColumnsType } from 'antd/es/table';
import { TInertiaProps } from '../../../Modules/Inertia/Entities';
import { useTableFilter } from '../../../Utils/hooks';
import { useModal } from '../../../Utils/modal';
import { Input, Modal, Tag } from 'antd';
import dayjs from 'dayjs';

import { ShareAltOutlined } from '@ant-design/icons';
import { GenderEnum } from '../../../../../../interface-models/iam/user.interface';
import { UserResponse } from '../../../../src/modules/iam/responses/user.response';
import { RoleResponse } from '../../../../src/modules/iam/responses/role.response';
import { Inertia } from '@inertiajs/inertia';

import { RowActionButtons } from '../../../Components/molecules/RowActionButtons';

import { Link } from '@inertiajs/inertia-react';
import { IUser } from '../../../Modules/User/Entities';
import { isMobileScreen } from '../../../Utils/utils';
import { EndpointRoute, Route } from 'apps/backoffice/app/Enums/Route';
import { ItemType } from '../../../Components/organisms/DataTable/Entities';
import { paginationTransform } from '../../../Components/organisms/DataTable/DataTable';
import { Button } from 'apps/backoffice/app/Components/atoms/Button';

interface IProps extends TInertiaProps {
    data: UserResponse[];
}

type TFilters = {
    gender?: string;
    start_at?: string;
    end_at?: string;
};

const UsersPage: React.FC = (props: IProps) => {
    const {
        implementTableFilter,
        filters,
        status: { isFetching },
    } = useTableFilter<TFilters>();
    const isMobile = isMobileScreen();

    const handleBatchDelete = (selectedRowKeys) => {
        Modal.confirm({
            title: 'Delete Users',
            content: 'Are you sure to delete selected users?',
            okText: 'Yes',
            cancelText: 'Cancel',
            onOk: () =>
                Inertia.post(EndpointRoute.DeleteBatchUser, {
                    ids: selectedRowKeys,
                }),
        });
    };

    const handleDelete = (id: number) =>
        Inertia.post(`${EndpointRoute.DeleteUser}/${id}`);

    const columns: ColumnsType<IUser> = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            responsive: ['lg'],
        },
        {
            title: 'Name',
            dataIndex: 'fullname',
            key: 'fullname',
            sorter: true,
            sortOrder: sortOrder({
                columnKey: 'fullname',
                order: filters.order,
                sort: filters.sort,
            }),
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
            render: (value) =>
                (isMobile && (value === 'male' ? 'm' : 'f')) || value,
            responsive: ['lg'],
        },
        {
            title: 'Phone Number',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
            render: (value) => (isMobile ? '+62xxx' : value),
            responsive: ['lg'],
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            responsive: ['md'],
        },
        {
            title: 'Roles',
            dataIndex: 'roles',
            key: 'roles',
            render: (roles: RoleResponse[]) =>
                roles?.map((role, index) => <Tag key={index}>{role.name}</Tag>),
        },
        {
            title: isMobile ? null : 'Action',
            key: 'action',
            width: '142px',
            render: (text, record) => {
                const userId = record.id;
                return (
                    <RowActionButtons
                        actions={[
                            {
                                type: 'view',
                                href: `${Route.Users}/${userId}`,
                                title: 'view',
                            },
                            {
                                type: 'edit',
                                href: `${Route.EditUser}/${userId}`,
                                title: 'edit',
                            },
                            {
                                type: 'delete',
                                title: 'delete',
                                onClick: () => {
                                    useModal({
                                        title: 'Are You Sure? ',
                                        type: 'confirm',
                                        variant: 'danger',
                                        onOk: () => handleDelete(userId),
                                    });
                                },
                            },
                        ]}
                    />
                );
            },
        },
    ];

    const genderOptions = [
        { label: 'Pria', value: GenderEnum.LakiLaki },
        { label: 'Wanita', value: GenderEnum.Perempuan },
    ];

    const batchActionMenus: ItemType[] = [
        {
            key: '1',
            label: 'Delete',
            onClick: (_, selectedRowKeys) =>
                useModal({
                    title: 'Are You Sure? ',
                    type: 'confirm',
                    variant: 'danger',
                    onOk: () => handleBatchDelete(selectedRowKeys),
                }),
            icon: <ShareAltOutlined />,
            style: { width: '151px' },
        },
    ];

    return (
        <MainLayout
            title="User List"
            topActions={
                <Link href={Route.CreateUser}>
                    <Button size="large" type="primary">
                        New User
                    </Button>
                </Link>
            }
        >
            <DataTable
                batchActionMenus={batchActionMenus}
                filterComponents={[
                    {
                        label: 'Email',
                        render: Input,
                        name: 'email',
                        placeholder: 'Search email',
                    },
                    {
                        label: 'Gender',
                        name: 'gender',
                        filterType: 'Select',
                        placeholder: 'Gender',
                        options: genderOptions,
                        defaultValue: filters.gender,
                    },
                    {
                        label: 'Created At',
                        name: 'created_at',
                        filterType: 'DateRangePicker',
                        range: 10,
                        defaultValue: [
                            filters.start_at && dayjs(filters.start_at),
                            filters.end_at && dayjs(filters.end_at),
                        ],
                    },
                ]}
                onChange={implementTableFilter}
                columns={columns}
                dataSource={props.data}
                rowKey="id"
                search={filters.search}
                pagination={paginationTransform(props.meta)}
                loading={isFetching}
            />
        </MainLayout>
    );
};

export default UsersPage;
