import React from 'react';
import { DataTable, sortOrder } from '../../../Components/organisms/DataTable';
import { MainLayout } from '../../../Layouts/MainLayout';
import { TInertiaProps } from '../../../Modules/Inertia/Entities';
import { Button } from 'antd';
import { ShareAltOutlined } from '@ant-design/icons';
import { showModal } from '../../../Utils/modal';

import type { ColumnsType } from 'antd/es/table';
import { useTableFilter } from '../../../Utils/hooks';
import { Breadcrumbs } from '../../../Common/Enums/Breadcrumb';
import { RowActionButtons } from 'apps/backoffice/app/Components/molecules/RowActionButtons';
import { ItemType } from '../../../Components/organisms/DataTable/Entities';
import { paginationTransform } from '../../../Components/organisms/DataTable/DataTable';
import { route, Route } from 'apps/backoffice/app/Common/Route/Route';
import { Inertia } from '@inertiajs/inertia';
import { Link } from '@inertiajs/inertia-react';
import { deleteRole } from 'apps/backoffice/app/Modules/Role/Action';
import {
    TCRoleIndexProps,
    TRoleIndexSchema,
} from 'apps/backoffice/@contracts/iam/role/role-index.contract';

type TProps = TInertiaProps & TCRoleIndexProps;

type TFilters = TRoleIndexSchema;

const RolePage: React.FC = (props: TProps) => {
    const {
        setQueryParams,
        filters,
        status: { isFetching },
    } = useTableFilter<TFilters>();

    const columns: ColumnsType<TProps['data'][number]> = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Role Name',
            dataIndex: 'name',
            key: 'name',
            sorter: true,
            sortOrder: sortOrder({
                columnKey: 'name',
                order: filters.order,
                sort: filters.sort,
            }),
        },
        {
            title: 'Key',
            dataIndex: 'key',
            key: 'key',
            sorter: true,
        },
        {
            title: 'created at',
            dataIndex: 'createdAt',
            key: 'createdAt',
            sorter: true,
        },
        {
            title: 'Action',
            key: 'action',
            width: '142px',
            render: (text, record): React.ReactElement => {
                return (
                    <RowActionButtons
                        actions={[
                            {
                                type: 'view',
                                href: route(Route.RoleDetail, {
                                    id: record.id,
                                }),
                                title: 'view',
                            },
                            {
                                type: 'edit',
                                href: route(Route.RoleEdit, { id: record.id }),
                                title: 'edit',
                            },
                            {
                                type: 'delete',
                                title: 'delete',
                                onClick: () =>
                                    showModal({
                                        title: 'Are You Sure? ',
                                        type: 'confirm',
                                        onOk: () => deleteRole(record),
                                    }),
                            },
                        ]}
                    />
                );
            },
        },
    ];

    const handleBatchDelete = (selectedRowKeys): void => {
        Inertia.post(`/permissions/deletes`, {
            ids: selectedRowKeys,
        });
    };

    const batchActionMenus: ItemType[] = [
        {
            key: '1',
            label: 'Delete',
            onClick: (_, selectedRowKeys) =>
                showModal({
                    title: 'Are You Sure? ',
                    type: 'confirm',
                    onOk: () => handleBatchDelete(selectedRowKeys),
                }),
            icon: <ShareAltOutlined />,
            style: { width: '151px' },
        },
    ];

    return (
        <MainLayout
            topActions={[
                <Link href="roles/create">
                    <Button size="large" type="primary">
                        New Role
                    </Button>
                </Link>,
            ]}
            breadcrumbs={Breadcrumbs.Roles.INDEX}
            title="Roles"
        >
            <DataTable
                batchActionMenus={batchActionMenus}
                onChange={setQueryParams}
                columns={columns}
                search={filters.search}
                dataSource={props?.data}
                rowKey="id"
                pagination={paginationTransform(props.meta)}
                loading={isFetching}
            />
        </MainLayout>
    );
};

export default RolePage;
