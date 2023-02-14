import React from 'react';
import { DataTable, sortOrder } from '../../../Components/organisms/DataTable';
import { MainLayout } from '../../../Layouts/MainLayout';
import { TInertiaProps } from '../../../Modules/Inertia/Entities';
import { Button, Tag } from 'antd';
import { FileExcelOutlined, ShareAltOutlined } from '@ant-design/icons';
import { useModal } from '../../../Utils/modal';

import { PermissionResponse } from '../../../../src/modules/iam/responses/permission.response';
import { RoleResponse } from '../../../../src/modules/iam/responses/role.response';
import { Inertia } from '@inertiajs/inertia';
import type { ColumnsType } from 'antd/es/table';
import { useTableFilter } from '../../../Utils/hooks';
import { Breadcrumbs } from '../../../Enums/Breadcrumb';
import { RowActionButtons } from 'apps/backoffice/app/Components/molecules/RowActionButtons';
import { ItemType } from '../../../Components/organisms/DataTable/Entities';

interface IProps extends TInertiaProps {
    data: PermissionResponse[];
}

const PermissionPage: React.FC = (props: IProps) => {
    const {
        setQueryParams,
        filters,
        status: { isFetching },
    } = useTableFilter();

    //TODO Confirm Delete Modal Example
    // const handleDeleteRow = (id) => {
    //     return Inertia.get(`/permissions/delete/${id}`);
    // };

    // const deleteModal = (id) =>
    //     useModal({
    //         title: 'Are You Sure? ',
    //         type: 'confirm',
    //         onOk: () => handleDeleteRow(id),
    //         onCancel: () => {
    //             return;
    //         },
    //     });

    const columns: ColumnsType<PermissionResponse> = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Permission Name',
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
            title: 'Roles',
            dataIndex: 'roles',
            key: 'roles',
            sorter: true,
            sortOrder: sortOrder({
                columnKey: 'roles',
                order: filters.order,
                sort: filters.sort,
            }),
            render: (roles: RoleResponse[]) =>
                roles?.map((role, index) => <Tag key={index}>{role.name}</Tag>),
        },
        {
            title: 'Key',
            dataIndex: 'key',
            key: 'key',
            sorter: true,
        },
        {
            title: 'Action',
            key: 'action',
            width: '142px',
            render: () => (
                <RowActionButtons
                    actions={[
                        {
                            type: 'view',
                            href: `#`,
                            title: 'view',
                        },
                        {
                            type: 'edit',
                            href: `#`,
                            title: 'edit',
                        },
                        {
                            type: 'delete',
                            title: 'delete',
                            onClick: () => {
                                // TODO : handle delete function
                            },
                        },
                    ]}
                />
            ),
        },
    ];

    const handleBatchDelete = (selectedRowKeys) => {
        Inertia.post(`/permissions/deletes`, {
            ids: selectedRowKeys,
        });
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
                }),
            icon: <ShareAltOutlined />,
            style: { width: '151px' },
        },
    ];

    return (
        <MainLayout
            breadcrumbs={Breadcrumbs.Permissions.INDEX}
            title="Permissions"
            topActions={
                <>
                    <Button
                        size="large"
                        icon={<FileExcelOutlined />}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        Import
                    </Button>
                    <Button size="large" type="primary">
                        New Permission
                    </Button>
                </>
            }
        >
            <DataTable
                batchActionMenus={batchActionMenus}
                onChange={setQueryParams}
                columns={columns}
                search={filters.search}
                dataSource={props?.data}
                rowKey="id"
                pagination={{
                    current: props.meta?.page,
                    total: props.meta?.total,
                    pageSize: props.meta?.perPage,
                }}
                loading={isFetching}
            />
        </MainLayout>
    );
};

export default PermissionPage;
