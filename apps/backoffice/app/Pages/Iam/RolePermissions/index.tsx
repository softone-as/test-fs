import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { CellProps, Column } from 'react-table';

import { Main as Layout } from '../../../Layouts/Main';

import { useDidUpdateEffect } from '../../../Utils/hooks';
import { confirmDelete, notifyError, notifySuccess } from '../../../Utils/utils';

import { EndpointRoute, Route } from '../../../Enums/Route';

import { ErrorType, SuccessType } from '../../../modules/Common/Entity/Common';
import { RolePermissionType } from '../../../modules/RolePermission/Entity/RolePermission';
import { PERMISSION_BACKOFFICE_DELETE_ROLE_PERMISSION, PERMISSION_BACKOFFICE_CREATE_ROLE_PERMISSION, PERMISSION_BACKOFFICE_DETAIL_ROLE_PERMISSION, PERMISSION_BACKOFFICE_UPDATE_ROLE_PERMISSION } from '../../../modules/Permission/Entity/Permission';

import { FilterSelectOption } from '../../../Components/molecules/Inputs/FilterSelect.molecule';
import ActionButtons from '../../../Components/molecules/DataTable/ActionButtons.molecule';
import DataTable from '../../../Components/organisms/DataTable/DataTable';
import HeaderText from '../../../Components/molecules/Text/HeaderText.molecule';

import { IPaginationMeta } from 'apps/backoffice/src/common/interface/index.interface';
import { usePage } from '@inertiajs/inertia-react';

type RolePermissionsPageProps = {
    data: RolePermissionType[];
    meta: IPaginationMeta;
};

const title = 'Daftar Role Permission';

const filterOptions = [
    {
        label: 'Latest',
        value: 'latest DESC',
    },
    {
        label: 'Oldest',
        value: 'oldest ASC',
    },
    {
        label: 'Alphabet A-Z',
        value: 'name ASC',
    },
    {
        label: 'Alphabet Z-A',
        value: 'name DESC',
    },
];

const RolePermissionsPage: React.FC<RolePermissionsPageProps> = ({ data, meta }) => {
    const queryParams = new URLSearchParams(window.location.search);
    const [isDisableTable, setDisableTable] = useState(false);
    const { userDetail } = usePage().props
    const permissionList = userDetail['role'].permissions.map(permission => permission.key)

    const [filters, setFilters] = useState({
        search: queryParams.get('search'),
        sort: queryParams.get('sort'),
        order: queryParams.get('order') || 'ASC',
        page: queryParams.get('page') || '1',
    });

    useDidUpdateEffect(() => {
        setDisableTable(true)

        Inertia.visit(window.location.pathname, {
            data: filters,
            preserveState: true,
            preserveScroll: true,
            replace: true,
            onFinish: () => {
                setDisableTable(false)
            },
            onSuccess: () => {
                setDisableTable(false)
            }
        });
    }, [filters]);

    const handleDeleteRolePermission = (id: string) => {
        if (confirmDelete()) {
            Inertia.get(`${EndpointRoute.DeleteRolePermission}/${id}`, {}, {
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

    const handleSort = (opt: FilterSelectOption) => {
        const [sort, order] = opt.value.split(' ');
        return setFilters({ ...filters, sort, order });
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        return setFilters({
            sort: filters.sort,
            order: filters.order,
            page: '1',
            search: e.target.value
        });
    };

    const handleClearSearch = () => {
        return setFilters({ ...filters, search: '' });
    };

    const columns = React.useMemo<Column<RolePermissionType>[]>(
        () => [
            {
                Header: 'Role',
                accessor: (item) => {
                    return item.role?.name || '-';
                },
            },
            {

                Header: 'Permission',
                accessor: (item) => {
                    return item.permission?.name || '-';
                },
            },
            {
                Header: 'Aksi',
                Cell: ({ cell }: CellProps<RolePermissionType>) => {
                    const id = cell.row.original.id;
                    return (
                        <ActionButtons
                            detailLink={`${Route.RolePermissions}/${id}`}
                            updateLink={`${Route.EditRolePermission}/${id}`}
                            onDelete={() => handleDeleteRolePermission(id)}
                            hideDelete={!permissionList.includes(PERMISSION_BACKOFFICE_DELETE_ROLE_PERMISSION)}
                            isShowDetail={permissionList.includes(PERMISSION_BACKOFFICE_DETAIL_ROLE_PERMISSION)}
                            hideUpdate={!permissionList.includes(PERMISSION_BACKOFFICE_UPDATE_ROLE_PERMISSION)}
                        />
                    );
                },
            },
        ],
        [],
    );

    return (
        <Layout title={title}>
            <div className="page__center">
                <HeaderText title={title} />

                <DataTable
                    isDisableTable={isDisableTable}
                    columns={columns}
                    tableContents={data}
                    meta={meta}
                    setFilters={setFilters}
                    filter={{
                        filters,
                        handleSearch,
                        handleSort,
                        filterOptions,
                        createHref: !permissionList.includes(PERMISSION_BACKOFFICE_CREATE_ROLE_PERMISSION) ? null : Route.CreateRolePermission,
                        hideDelete: true,
                        handleClearSearch,
                    }}
                />
            </div>
        </Layout>
    );
};

export default RolePermissionsPage;
