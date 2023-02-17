import React from 'react';
import { DataTable, sortOrder } from '../../../Components/organisms/DataTable';
import { MainLayout } from '../../../Layouts/MainLayout';
import { TInertiaProps } from '../../../Modules/Inertia/Entities';
import { Button } from 'antd';
import { ShareAltOutlined } from '@ant-design/icons';
import { useModal } from '../../../Utils/modal';

import { PermissionResponse } from '../../../../src/modules/iam/responses/permission.response';
import { RoleResponse } from '../../../../src/modules/iam/responses/role.response';
import type { ColumnsType } from 'antd/es/table';
import { useTableFilter } from '../../../Utils/hooks';
import { Breadcrumbs } from '../../../Enums/Breadcrumb';
import { RowActionButtons } from 'apps/backoffice/app/Components/molecules/RowActionButtons';
import { ItemType } from '../../../Components/organisms/DataTable/Entities';
import { paginationTransform } from '../../../Components/organisms/DataTable/DataTable';
import { Route } from 'apps/backoffice/app/Enums/Route';
import { Inertia } from '@inertiajs/inertia';
import { Link } from '@inertiajs/inertia-react';
import { deleteRole } from 'apps/backoffice/app/Modules/Role/Action';

interface IProps extends TInertiaProps {
    data: RoleResponse[];
}

const RolePage: React.FC = (props: IProps) => {
    const {
        setQueryParams,
        filters,
        status: { isFetching },
    } = useTableFilter();

    const handleDetail = (id: number) => {
        return Inertia.get(`${Route.Roles}/${id}`);
    };

    const handleEdit = (id: number) => {
        return Inertia.get(`${Route.EditRole}/${id}`);
    };

    const columns: ColumnsType<PermissionResponse> = [
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
            render: (text, record) => {
                const id = record.id;
                return (
                    <RowActionButtons
                        actions={[
                            {
                                type: 'view',
                                href: `#`,
                                title: 'view',
                                onClick: () => handleDetail(id),
                            },
                            {
                                type: 'edit',
                                href: `#`,
                                title: 'edit',
                                onClick: () => handleEdit(id),
                            },
                            {
                                type: 'delete',
                                title: 'delete',
                                onClick: () =>
                                    useModal({
                                        title: 'Are You Sure? ',
                                        type: 'confirm',
                                        onOk: () => deleteRole(id),
                                        onCancel: handleCancel,
                                    }),
                            },
                        ]}
                    />
                );
            },
        },
    ];

    const handleBatchDelete = (selectedRowKeys) => {
        Inertia.post(`/permissions/deletes`, {
            ids: selectedRowKeys,
        });
    };

    const handleCancel = () => {
        // TODO: Replace with actual cancel logic
        console.log('cancel');
    };

    const batchActionMenus: ItemType[] = [
        {
            key: '1',
            label: 'Delete',
            onClick: (_, selectedRowKeys) =>
                useModal({
                    title: 'Are You Sure? ',
                    type: 'confirm',
                    onOk: () => handleBatchDelete(selectedRowKeys),
                    onCancel: handleCancel,
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
