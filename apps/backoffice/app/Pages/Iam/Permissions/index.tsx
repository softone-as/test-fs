import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { CellProps, Column } from 'react-table';

import Layout from '../../../Layouts/Main';

import { useDidUpdateEffect } from '../../../Utils/hooks';

import { Route } from '../../../Enums/Route';

import {
    PermissionType, PERMISSION_BACKOFFICE_DETAIL_PERMISSION,
    PERMISSION_BACKOFFICE_UPDATE_PERMISSION
} from '../../../modules/Permission/Entity/Permission';

import { FilterSelectOption } from '../../../Components/molecules/Inputs/FilterSelect.molecule';
import ActionButtons from '../../../Components/molecules/DataTable/ActionButtons.molecule';
import DataTable from '../../../Components/organisms/DataTable/DataTable';
import HeaderText from '../../../Components/molecules/Text/HeaderText.molecule';

import { IPaginationMeta } from 'apps/backoffice/src/common/interface/index.interface';
import { usePage } from '@inertiajs/inertia-react';

type PermissionsPageProps = {
    data: PermissionType[];
    meta: IPaginationMeta;
};

const title = 'Daftar Permission';

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

const PermissionsPage: React.FC<PermissionsPageProps> = ({ data, meta }) => {
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

    const columns = React.useMemo<Column<PermissionType>[]>(
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
                Cell: ({ cell }: CellProps<PermissionType>) => {
                    const id = cell.row.original.id;
                    return (
                        <ActionButtons
                            detailLink={`${Route.Permissions}/${id}`}
                            updateLink={`${Route.EditPermission}/${id}`}
                            hideDelete={true}
                            isShowDetail={permissionList.includes(PERMISSION_BACKOFFICE_DETAIL_PERMISSION)}
                            hideUpdate={!permissionList.includes(PERMISSION_BACKOFFICE_UPDATE_PERMISSION)}
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
                        createHref: null,
                        hideDelete: true,
                        handleClearSearch,
                    }}
                />
            </div>
        </Layout>
    );
};

export default PermissionsPage;
