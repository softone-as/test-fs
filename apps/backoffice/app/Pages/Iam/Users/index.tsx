import React from 'react';
import { DataTable, sortOrder } from '../../../Components/organisms/DataTable';
import { MainLayout } from '../../../Layouts/MainLayout';
import type { ColumnsType } from 'antd/es/table';
import { TInertiaProps } from '../../../Modules/Inertia/Entities';
import { useTableFilter } from '../../../Utils/hooks';
import { useModal } from '../../../Utils/modal';
import {} from '../../../Utils/notification';
import { Button, Form, Select, Tag } from 'antd';
import dayjs from 'dayjs';
import { DateRangePicker } from '../../../Components/molecules/Pickers';
import { FileExcelOutlined, ShareAltOutlined } from '@ant-design/icons';
import { GenderEnum } from '../../../../../../interface-models/iam/user.interface';
import { UserResponse } from '../../../../src/modules/iam/responses/user.response';
import { RoleResponse } from '../../../../src/modules/iam/responses/role.response';
import { Inertia } from '@inertiajs/inertia';

import { RowActionButtons } from '../../../Components/molecules/RowActionButtons';

import { Link } from '@inertiajs/inertia-react';
import { IUser } from '../../../Modules/User/Entities';
import { isMobileScreen } from '../../../Utils/utils';
import { ItemType } from '../../../Components/organisms/DataTable/Entities';
import { paginationTransform } from '../../../Components/organisms/DataTable/DataTable';

interface IProps extends TInertiaProps {
    data: UserResponse[];
}

type TFilters = {
    gender?: string;
    start_at?: string;
    end_at?: string;
};

const UsersPage: React.FC = (props: IProps) => {
    const {
        setQueryParams,
        filters,
        status: { isFetching },
    } = useTableFilter<TFilters>();
    const isMobile = isMobileScreen();

    const handleBatchDelete = (selectedRowKeys) => {
        return Inertia.post(`/users/deletes`, {
            ids: selectedRowKeys,
        });
    };

    const handleCancel = () => {
        console.log('cancel modal');
    };

    const columns: ColumnsType<IUser> = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            responsive: ['lg'],
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
            render: (value) =>
                (isMobile && (value === 'male' ? 'm' : 'f')) || value,
            responsive: ['lg'],
        },
        {
            title: 'Phone Number',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
            render: (value) => (isMobile ? '+62xxx' : value),
            responsive: ['lg'],
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            responsive: ['md'],
        },
        {
            title: 'Roles',
            dataIndex: 'roles',
            key: 'roles',
            render: (roles: RoleResponse[]) =>
                roles?.map((role, index) => <Tag key={index}>{role.name}</Tag>),
        },
        {
            title: isMobile ? null : 'Action',
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

    const batchActionMenus: ItemType[] = [
        {
            key: '1',
            label: 'Delete',
            onClick: (_, selectedRowKeys) =>
                useModal({
                    title: 'Are You Sure? ',
                    type: 'confirm',
                    onOk: () => handleBatchDelete(selectedRowKeys),
                    onCancel: () => handleCancel(),
                }),
            icon: <ShareAltOutlined />,
            style: { width: '151px' },
        },
    ];

    return (
        <MainLayout
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
        >
            <DataTable
                batchActionMenus={batchActionMenus}
                filterComponents={[
                    <Form.Item
                        name="gender"
                        initialValue={filters.gender}
                        noStyle
                    >
                        <Select
                            placeholder="Gender"
                            options={genderOptions}
                            allowClear
                            style={{ width: '90px' }}
                        />
                    </Form.Item>,
                    <Form.Item
                        name="rangeCreateAt"
                        initialValue={[
                            filters.start_at && dayjs(filters.start_at),
                            filters.end_at && dayjs(filters.end_at),
                        ]}
                        noStyle
                    >
                        <DateRangePicker range={10} />
                    </Form.Item>,
                ]}
                onChange={({ rangeCreateAt, ...filtersState }) => {
                    setQueryParams({
                        ...filtersState,
                        start_at: rangeCreateAt?.[0].toISOString(),
                        end_at: rangeCreateAt?.[1].toISOString(),
                    });
                }}
                columns={columns}
                dataSource={props.data}
                rowKey="id"
                search={filters.search}
                pagination={paginationTransform(props.meta)}
                loading={isFetching}
            />
        </MainLayout>
    );
};

export default UsersPage;
