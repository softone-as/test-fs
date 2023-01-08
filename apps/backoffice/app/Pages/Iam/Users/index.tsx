import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { CellProps, Column } from 'react-table';

import { Main as Layout } from '../../../Layouts/Main';

import { useDidUpdateEffect } from '../../../Utils/hooks';
import { confirmDelete, notifyError, notifySuccess } from '../../../Utils/utils';

import { EndpointRoute, Route } from '../../../Enums/Route';

import { ErrorType, SuccessType } from '../../../modules/Common/Entity/Common';
import { UserType } from '../../../modules/User/Entity/User';
import {
    PERMISSION_BACKOFFICE_DELETE_USER, PERMISSION_BACKOFFICE_CREATE_USER, PERMISSION_BACKOFFICE_DETAIL_USER,
    PERMISSION_BACKOFFICE_UPDATE_USER
} from '../../../modules/Permission/Entity/Permission';

import { FilterSelectOption } from '../../../Components/molecules/Inputs/FilterSelect.molecule';
import ActionButtons from '../../../Components/molecules/DataTable/ActionButtons.molecule';
import DataTable from '../../../Components/organisms/DataTable/DataTable';
import HeaderText from '../../../Components/molecules/Text/HeaderText.molecule';

import { IPaginationMeta } from 'apps/backoffice/src/common/interface/index.interface';
import { usePage } from '@inertiajs/inertia-react';

type UsersPageProps = {
    data: UserType[];
    meta: IPaginationMeta;
};

const title = 'Daftar User';

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

const UsersPage: React.FC<UsersPageProps> = ({ data, meta }) => {
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

    const handleDeleteUser = (id: string) => {
        if (confirmDelete()) {
            Inertia.get(`${EndpointRoute.DeleteUser}/${id}`, {}, {
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

    const columns = React.useMemo<Column<UserType>[]>(
        () => [
            {
                Header: 'Nama',
                accessor: 'fullname',
            },
            {
                Header: 'No Telepon',
                accessor: 'phoneNumber',
            },
            {
                Header: 'Aksi',
                Cell: ({ cell }: CellProps<UserType>) => {
                    const id = cell.row.original.id;
                    return (
                        <ActionButtons
                            detailLink={`${Route.Users}/${id}`}
                            updateLink={`${Route.EditUser}/${id}`}
                            onDelete={() => handleDeleteUser(id)}
                            hideDelete={!permissionList.includes(PERMISSION_BACKOFFICE_DELETE_USER)}
                            isShowDetail={permissionList.includes(PERMISSION_BACKOFFICE_DETAIL_USER)}
                            hideUpdate={!permissionList.includes(PERMISSION_BACKOFFICE_UPDATE_USER)}
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
                        createHref: !permissionList.includes(PERMISSION_BACKOFFICE_CREATE_USER) ? null : Route.CreateUser,
                        hideDelete: true,
                        handleClearSearch,
                    }}
                />
            </div>
        </Layout>
    );
};

export default UsersPage;
