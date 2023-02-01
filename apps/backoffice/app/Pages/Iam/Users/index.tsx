import React, { useState } from 'react';
import { DataTable } from '../../../Components/organisms/DataTable';
import { MainLayout } from '../../../Layouts/MainLayout';
import type { ColumnsType } from 'antd/es/table'
import { TInertiaProps } from '../../../Modules/Inertia/Entities'
import { useTableFilter } from '../../../Utils/hooks'
import { useModal } from '../../../Utils/modal'
import { } from '../../../Utils/notification'
import { FilterSection } from '../../../Components/organisms/FilterSection'
import { Button, MenuProps, Select, Tag } from 'antd';
import { DateRangePicker, TRangeValue } from '../../../Components/molecules/Pickers';
import { PageHeader } from '../../../Components/molecules/Headers';
import { EditOutlined, EyeOutlined, FileExcelOutlined, ShareAltOutlined, DeleteOutlined } from '@ant-design/icons';
import { iconActionTableStyle } from '../../../Utils/theme';
import { UserResponse } from '../../../../src/modules/iam/responses/user.response'
import { RoleResponse } from '../../../../src/modules/iam/responses/role.response'
import { Inertia } from '@inertiajs/inertia';


interface IProps extends TInertiaProps {
    data: UserResponse[],
}

type TFilters = {
    page: string,
    per_page: string,
    search?: string,
    gender?: string,
    start_at?: string,
    end_at?: string,
    sort?: 'latest' | 'oldest'
}

const UsersPage: React.FC = (props: IProps) => {

    const { setQueryParams, filters } = useTableFilter<TFilters>()
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])


    const handleDeleteRow = (id) => {

        return Inertia.get(`/users/delete/${id}`)
    }

    const handleBatchDelete = () => {
        return Inertia.post(`/users/deletes`, {
            ids: selectedRowKeys
        })
    }

    const deleteModal = (id) => useModal({ title: 'Are You Sure? ', type: 'confirm', onOk: () => handleDeleteRow(id), onCancel: () => { return } })

    const columns: ColumnsType<UserResponse> = [
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
            render: (roles: RoleResponse[]) => roles?.map((role, index) => <Tag key={index}>{role.name}</Tag>)
        },
        {
            title: 'Action',
            key: 'action',
            width: '142px',
            render: (value: UserResponse) => {
                return (
                    <Button.Group size='small'>
                        <Button type='link' href='/users/1'><EyeOutlined style={iconActionTableStyle} /></Button>
                        <Button type='link' href='/users/edit/1'><EditOutlined style={iconActionTableStyle} /></Button>
                        <Button type='text' onClick={() => deleteModal(value.id)}><DeleteOutlined style={iconActionTableStyle} /></Button>
                    </Button.Group>
                )
            }
        }

    ]

    const handleSearch = (val) => {
        return setQueryParams({ search: val })
    }

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const batchActionMenus: MenuProps['items'] = [
        {
            key: '1',
            label: 'Delete',
            onClick: () => useModal({ title: 'Are You Sure? ', type: 'confirm', onOk: handleBatchDelete }),
            icon: <ShareAltOutlined />,
            style: { width: '151px' }
        }
    ]

    const handleRange = (val: TRangeValue) => {
        return setQueryParams({ start_at: val?.[0].toISOString(), end_at: val?.[1].toISOString() })
    }

    const handleFilterGender = (data) => {
        return setQueryParams({ gender: data })
    }

    const handleSorter = (columnKey: string, order: 'ascend' | 'descend') => {
        if (!order) {
            return
        }
        return setQueryParams({ sort: order === 'ascend' ? 'oldest' : 'latest' })
    }

    return (
        <MainLayout >
            <PageHeader title='User List' topActions={[
                <Button size='large' icon={<FileExcelOutlined />} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Import</Button>,
                <Button size='large' type='primary'>New User</Button>
            ]} />
            <FilterSection
                searchHandler={handleSearch}
                selectedRows={selectedRowKeys}
                batchActionMenus={batchActionMenus}
                filters={
                    [
                        <Select placeholder='Gender' defaultValue={filters.gender} options={[{ label: 'Pria', value: 'MALE' }, { label: 'Wanita', value: 'FEMALE' }]} onChange={handleFilterGender} allowClear style={{ width: '90px' }} />,
                        <DateRangePicker range={10} onChange={handleRange} />,
                    ]
                } />
            <DataTable
                rowSelection={{ selectedRowKeys, onChange: onSelectChange }}
                columns={columns}
                dataSource={props?.data.map(item => ({ ...item, key: item.id }))}
                total={props?.meta?.total}
                perPage={props.meta.perPage}
                onSort={handleSorter}
                onPageChange={(page, pageSize) => setQueryParams({ page: page.toString(), per_page: pageSize.toString() })}
            />
        </MainLayout>
    );
};

export default UsersPage;
