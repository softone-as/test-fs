import React from 'react';
import {
    DataTable,
    sortOrder,
    TOnSort,
} from '../../../Components/organisms/DataTable';
import { MainLayout } from '../../../Layouts/MainLayout';
import { TInertiaProps } from '../../../Modules/Inertia/Entities';
import { FilterSection } from '../../../Components/organisms/FilterSection';
import { Tag } from 'antd';

import { PermissionResponse } from '../../../../src/modules/iam/responses/permission.response';
import { RoleResponse } from '../../../../src/modules/iam/responses/role.response';
import type { ColumnsType } from 'antd/es/table';
import { useTableFilter } from '../../../Utils/hooks';
import { Breadcrumbs } from '../../../Enums/Breadcrumb';
import { RowActionButtons } from 'apps/backoffice/app/Components/molecules/RowActionButtons';
import { Route } from 'apps/backoffice/app/Enums/Route';
import { Inertia } from '@inertiajs/inertia';

interface IProps extends TInertiaProps {
    data: PermissionResponse[];
}

const PermissionPage: React.FC = (props: IProps) => {
    const {
        setQueryParams,
        filters,
        status: { isFetching },
    } = useTableFilter();

    const handleDetail = (id: number) => {
        return Inertia.get(`${Route.Permissions}/${id}`);
    };

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
                        ]}
                    />
                );
            },
        },
    ];

    const handleSort = (sorter: TOnSort<PermissionResponse>) => {
        return setQueryParams({
            sort: sorter.columnKey as string,
            order: sorter.order,
        });
    };

    const handleSearch = (value) => {
        setQueryParams({ search: value });
    };

    return (
        <MainLayout
            breadcrumbs={Breadcrumbs.Permissions.INDEX}
            title="Permissions"
        >
            <FilterSection
                searchValue={filters.search}
                onSearch={handleSearch}
                batchActionMenus={[]}
            />
            <DataTable
                columns={columns}
                dataSource={props?.data}
                meta={props?.meta}
                onSort={handleSort}
                onPageChange={(page, pageSize) =>
                    setQueryParams({ page: page, per_page: pageSize })
                }
                loading={isFetching}
            />
        </MainLayout>
    );
};

export default PermissionPage;
