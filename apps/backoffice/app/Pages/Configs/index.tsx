import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { CellProps, Column } from 'react-table';

import Layout from '../../Layouts/Main';

import { useDidUpdateEffect } from '../../Utils/hooks';

import { Route } from '../../Enums/Route';

import { ConfigType } from '../../modules/Config/Entity/Config';
import {
    PERMISSION_BACKOFFICE_DELETE_CONFIG,
    PERMISSION_BACKOFFICE_DETAIL_CONFIG,
    PERMISSION_BACKOFFICE_UPDATE_CONFIG
} from '../../../../../constants/permission.constant';

import { FilterSelectOption } from '../../Components/molecules/Inputs/FilterSelect.molecule';
import ActionButtons from '../../Components/molecules/DataTable/ActionButtons.molecule';
import DataTable from '../../Components/organisms/DataTable/DataTable';
import HeaderText from '../../Components/molecules/Text/HeaderText.molecule';

import { IPaginationMeta } from 'apps/backoffice/src/common/interface/index.interface';
import { usePage } from '@inertiajs/inertia-react';

type ConfigsPageProps = {
    data: ConfigType[];
    meta: IPaginationMeta;
};

const title = 'Daftar Config';

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

const ConfigsPage: React.FC<ConfigsPageProps> = ({ data, meta }) => {
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

    const columns = React.useMemo<Column<ConfigType>[]>(
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
                Header: 'Value',
                accessor: 'value',
            },
            {
                Header: 'Aksi',
                Cell: ({ cell }: CellProps<ConfigType>) => {
                    const id = cell.row.original.id;
                    return (
                        <ActionButtons
                            detailLink={`${Route.Configs}/${id}`}
                            updateLink={`${Route.EditConfig}/${id}`}
                            hideDelete={!permissionList.includes(PERMISSION_BACKOFFICE_DELETE_CONFIG)}
                            isShowDetail={permissionList.includes(PERMISSION_BACKOFFICE_DETAIL_CONFIG)}
                            hideUpdate={!permissionList.includes(PERMISSION_BACKOFFICE_UPDATE_CONFIG)}
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

export default ConfigsPage;
