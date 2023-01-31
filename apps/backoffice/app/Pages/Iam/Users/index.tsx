import React, { useState } from 'react';
import { DataTable } from '../../../Components/organisms/DataTable';
import { MainLayout } from '../../../Layouts/MainLayout';
import type { ColumnsType } from 'antd/es/table'
import { TInertiaProps } from '../../../Modules/Inertia/Entities'
import { useTableFilter } from '../../../Utils/hooks'
import { useModal } from '../../../Utils/modal'
import { FilterSection } from '../../../Components/organisms/FilterSection'
import { Button, MenuProps, Select, Space, Tag } from 'antd';
import { DateRangePicker, TRangeValue } from '../../../Components/molecules/Pickers';
import { PageHeader } from '../../../Components/molecules/Headers';
import { EditOutlined, EyeOutlined, FileExcelOutlined, ShareAltOutlined, DeleteOutlined } from '@ant-design/icons';
import { Link } from '@inertiajs/inertia-react'
import { iconActionTableStyle } from '../../../Utils/theme';
import { UserResponse } from '../../../../src/modules/iam/responses/user.response'
import { RoleResponse } from '../../../../src/modules/iam/responses/role.response'

interface IProps extends TInertiaProps {
    data: UserResponse[],
}

const UsersPage: React.FC = (props: IProps) => {

    const { setQueryParams } = useTableFilter<UserResponse>()
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])

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
            render: () => <Space size='large'>
                <Link href='#'><EyeOutlined style={iconActionTableStyle} /></Link>
                <Link href='#'><EditOutlined style={iconActionTableStyle} /></Link>
                <Link href='#'><DeleteOutlined style={iconActionTableStyle} /></Link>
            </Space>
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
            onClick: () => useModal({ title: 'Are You Sure? ', type: 'warning', onOk: () => alert('Ok Delete') }),
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


    return (
        <MainLayout >
            <PageHeader title='User List' topActions={[
                <Button size='large' icon={<FileExcelOutlined />} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Import</Button>,
                <Button size='large' type='primary'>New User</Button>
            ]} />
            <FilterSection searchHandler={handleSearch}
                selectedRows={selectedRowKeys}
                batchActionMenus={batchActionMenus}
                filters={
                    [
                        <Select placeholder='Gender' options={[{ label: 'Pria', value: 'MALE' }, { label: 'Wanita', value: 'FEMALE' }]} onChange={handleFilterGender} allowClear style={{ width: '90px' }} />,
                        <DateRangePicker range={10} onChange={handleRange} />,
                    ]
                } />
            <DataTable
                rowSelection={{ selectedRowKeys, onChange: onSelectChange }}
                columns={columns}
                dataSource={props?.data.map(item => ({ ...item, key: item.id }))}
                total={props?.meta?.total}
                perPage={props.meta.perPage}
                onPageChange={(page, pageSize) => setQueryParams({ page: page.toString(), per_page: pageSize.toString() })}
            />
        </MainLayout>
    );
};

export default UsersPage;
