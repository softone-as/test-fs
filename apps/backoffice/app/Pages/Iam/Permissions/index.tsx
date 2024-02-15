import React from 'react';
import { DataTable, sortOrder } from '../../../Components/organisms/DataTable';
import { MainLayout } from '../../../Layouts/MainLayout';
import { Tag } from 'antd';
import { ShareAltOutlined } from '@ant-design/icons';
import { useModal } from '../../../Utils/modal';

import type { ColumnsType } from 'antd/es/table';
import { useTableFilter } from '../../../Utils/hooks';
import { Breadcrumbs } from '../../../Common/Enums/Breadcrumb';
import { RowActionButtons } from 'apps/backoffice/app/Components/molecules/RowActionButtons';
import { ItemType } from '../../../Components/organisms/DataTable/Entities';
import { paginationTransform } from '../../../Components/organisms/DataTable/DataTable';
import { Route } from 'apps/backoffice/app/Common/Route/Route';
import { Inertia } from '@inertiajs/inertia';
import { TCPermissionIndexProps } from 'apps/backoffice/@contracts/iam/permission/permission-index.contract';

type TProps = TCPermissionIndexProps;

const PermissionPage: React.FC = (props: TProps) => {
    const {
        implementTableFilter,
        filters,
        status: { isFetching },
    } = useTableFilter();

    const columns: ColumnsType<TProps['data'][number]> = [
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
            render: (_, record) =>
                record.roles?.map((role, index) => (
                    <Tag key={index}>{role.name}</Tag>
                )),
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
            render: (text, record): React.ReactElement => {
                const id = record.id;
                return (
                    <RowActionButtons
                        actions={[
                            {
                                type: 'view',
                                href: `${Route.Permissions}/${id}`,
                                title: 'view',
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

    const handleCancel = (): void => {
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
            breadcrumbs={Breadcrumbs.Permissions.INDEX}
            title="Permissions"
        >
            <DataTable
                batchActionMenus={batchActionMenus}
                onChange={implementTableFilter}
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

export default PermissionPage;
