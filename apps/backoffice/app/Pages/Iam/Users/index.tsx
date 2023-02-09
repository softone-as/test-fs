import React, { useState } from 'react';
import {
    DataTable,
    TOnSort,
    sortOrder,
} from '../../../Components/organisms/DataTable';
import { MainLayout } from '../../../Layouts/MainLayout';
import type { ColumnsType } from 'antd/es/table';
import { TInertiaProps } from '../../../Modules/Inertia/Entities';
import { useTableFilter } from '../../../Utils/hooks';
import { useModal } from '../../../Utils/modal';
import {} from '../../../Utils/notification';
import { FilterSection } from '../../../Components/organisms/FilterSection';
import { Button, MenuProps, Select, Tag } from 'antd';
import {
    DateRangePicker,
    TRangeValue,
} from '../../../Components/molecules/Pickers';
import { PageHeader } from '../../../Components/molecules/Headers';
import { FileExcelOutlined, ShareAltOutlined } from '@ant-design/icons';
import { GenderEnum } from '../../../../../../interface-models/iam/user.interface';
import { UserResponse } from '../../../../src/modules/iam/responses/user.response';
import { RoleResponse } from '../../../../src/modules/iam/responses/role.response';
import { Inertia } from '@inertiajs/inertia';

import { RowActionButtons } from '../../../Components/molecules/RowActionButtons';
import { Page } from '@inertiajs/inertia';
import { useNotification } from '../../../Utils/notification';

import { Link, usePage } from '@inertiajs/inertia-react';
import { IUser } from '../../../Modules/User/Entities';
import { Breadcrumbs } from '../../../Enums/Breadcrumb';
import dayjs from 'dayjs';

interface IProps extends TInertiaProps {
    data: UserResponse[];
}

type TFilters = {
    gender?: string;
    start_at?: string;
    end_at?: string;
};

const UsersPage: React.FC = (props: IProps) => {
    const { props: pageProps } = usePage<Page<TInertiaProps>>();

    const {
        setQueryParams,
        filters,
        status: { isFetching },
    } = useTableFilter<TFilters>();
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    const handleBatchDelete = () => {
        return Inertia.post(`/users/deletes`, {
            ids: selectedRowKeys,
        });
    };
    //TODO Handle Modal Delete example
    // const handleDeleteRow = (id) => {
    //     return Inertia.get(`/users/delete/${id}`);
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

    const columns: ColumnsType<IUser> = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'fullname',
            key: 'fullname',
            sorter: true,
            sortOrder: sortOrder({
                columnKey: 'fullname',
                order: filters.order,
                sort: filters.sort,
            }),
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
        },
        {
            title: 'Phone Number',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Roles',
            dataIndex: 'roles',
            key: 'roles',
            render: (roles: RoleResponse[]) =>
                roles?.map((role, index) => <Tag key={index}>{role.name}</Tag>),
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

    const genderOptions = [
        { label: 'Pria', value: GenderEnum.LakiLaki },
        { label: 'Wanita', value: GenderEnum.Perempuan },
    ];

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const batchActionMenus: MenuProps['items'] = [
        {
            key: '1',
            label: 'Delete',
            onClick: () =>
                useModal({
                    title: 'Are You Sure? ',
                    type: 'confirm',
                    onOk: handleBatchDelete,
                }),
            icon: <ShareAltOutlined />,
            style: { width: '151px' },
        },
    ];

    const handleRange = (val: TRangeValue) => {
        return setQueryParams({
            start_at: val?.[0].toISOString(),
            end_at: val?.[1].toISOString(),
        });
    };

    const handleFilterGender = (data) => {
        return setQueryParams({ gender: data });
    };

    const handleSort = (sorter: TOnSort<UserResponse>) => {
        return setQueryParams({
            sort: sorter.columnKey as string,
            order: sorter.order,
        });
    };

    const handleSearch = (value) => {
        setQueryParams({ search: value });
    };

    // Notification when user's created is success
    pageProps.success != null &&
        useNotification({
            type: 'success',
            message: pageProps.success.message,
        });

    return (
        <MainLayout breadcrumbItems={Breadcrumbs.Users.INDEX}>
            <PageHeader
                title="User List"
                topActions={[
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
                    </Button>,
                    <Link href="users/create">
                        <Button size="large" type="primary">
                            New User
                        </Button>
                    </Link>,
                ]}
            />
            <FilterSection
                searchValue={filters.search}
                onSearch={handleSearch}
                selectedRows={selectedRowKeys}
                batchActionMenus={batchActionMenus}
                filters={[
                    <Select
                        placeholder="Gender"
                        defaultValue={filters.gender}
                        options={genderOptions}
                        onChange={handleFilterGender}
                        allowClear
                        style={{ width: '90px' }}
                    />,
                    <DateRangePicker
                        range={10}
                        onChange={handleRange}
                        defaultValue={[
                            dayjs(filters.start_at),
                            dayjs(filters.end_at),
                        ]}
                    />,
                ]}
            />
            <DataTable
                rowSelection={{ selectedRowKeys, onChange: onSelectChange }}
                columns={columns}
                dataSource={props.data.map((item) => ({
                    ...item,
                    key: item.id,
                }))}
                meta={props.meta}
                onSort={handleSort}
                onPageChange={(page, pageSize) =>
                    setQueryParams({ page: page, per_page: pageSize })
                }
                loading={isFetching}
            />
        </MainLayout>
    );
};

export default UsersPage;
