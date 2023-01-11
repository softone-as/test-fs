import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { CellProps, Column } from 'react-table';

import { Main as Layout } from '../../../Layouts/Main';

import { useDidUpdateEffect } from '../../../Utils/hooks';
import { confirmDelete, notifyError, notifySuccess } from '../../../Utils/utils';

import { EndpointRoute, Route } from '../../../Enums/Route';

import { ErrorType, SuccessType } from '../../../modules/Common/Entity/Common';
import { RoleType } from '../../../modules/Role/Entity/Role';
import {
    PERMISSION_BACKOFFICE_DELETE_ROLE, PERMISSION_BACKOFFICE_CREATE_ROLE, PERMISSION_BACKOFFICE_DETAIL_ROLE,
    PERMISSION_BACKOFFICE_UPDATE_ROLE
} from '../../../../../../constants/permission.constant';

import { FilterSelectOption } from '../../../Components/molecules/Inputs/FilterSelect.molecule';
import ActionButtons from '../../../Components/molecules/DataTable/ActionButtons.molecule';
import DataTable from '../../../Components/organisms/DataTable/DataTable';
import HeaderText from '../../../Components/molecules/Text/HeaderText.molecule';

import { IPaginationMeta } from 'apps/backoffice/src/common/interface/index.interface';
import { usePage } from '@inertiajs/inertia-react';

type RolesPageProps = {
    data: RoleType[];
    meta: IPaginationMeta;
};

const title = 'Daftar Role';

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

const RolesPage: React.FC<RolesPageProps> = ({ data, meta }) => {
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

    const handleDeleteRole = (id: string) => {
        if (confirmDelete()) {
            Inertia.get(`${EndpointRoute.DeleteRole}/${id}`, {}, {
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
            page: '1', search: e.target.value
        });
    };

    const handleClearSearch = () => {
        return setFilters({ ...filters, search: '' });
    };

    const columns = React.useMemo<Column<RoleType>[]>(
        () => [
            {
                Header: 'Nama',
                accessor: 'name',
            },
            {
                Header: 'Key',
                accessor: 'key',
            },
            {
                Header: 'Aksi',
                Cell: ({ cell }: CellProps<RoleType>) => {
                    const id = cell.row.original.id;
                    return (
                        <ActionButtons
                            detailLink={`${Route.Roles}/${id}`}
                            updateLink={`${Route.EditRole}/${id}`}
                            onDelete={() => handleDeleteRole(id)}
                            hideDelete={!permissionList.includes(PERMISSION_BACKOFFICE_DELETE_ROLE)}
                            isShowDetail={permissionList.includes(PERMISSION_BACKOFFICE_DETAIL_ROLE)}
                            hideUpdate={!permissionList.includes(PERMISSION_BACKOFFICE_UPDATE_ROLE)}
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
                        createHref: !permissionList.includes(PERMISSION_BACKOFFICE_CREATE_ROLE) ? null : Route.CreateRole,
                        hideDelete: true,
                        handleClearSearch,
                    }}
                />
            </div>
        </Layout>
    );
};

export default RolesPage;
