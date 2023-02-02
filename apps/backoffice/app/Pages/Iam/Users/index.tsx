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
import { GenderEnum } from '../../../../../../interface-models/iam/user.interface'
import { UserResponse } from '../../../../src/modules/iam/responses/user.response'
import { RoleResponse } from '../../../../src/modules/iam/responses/role.response'
import { Inertia } from '@inertiajs/inertia';


interface IProps extends TInertiaProps {
    data: UserResponse[],
}

type TFilters = {
    gender?: string,
    start_at?: string,
    end_at?: string,

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
                        <Button type='link' href={`/users/${value.id}`}><EyeOutlined style={iconActionTableStyle} /></Button>
                        <Button type='link' href={`/users/edit/${value.id}`}><EditOutlined style={iconActionTableStyle} /></Button>
                        <Button type='text' onClick={() => deleteModal(value.id)}><DeleteOutlined style={iconActionTableStyle} /></Button>
                    </Button.Group>
                )
            }
        }

    ]

    const genderOptions = [{ label: 'Pria', value: GenderEnum.LakiLaki }, { label: 'Wanita', value: GenderEnum.Perempuan }]

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



    return (
        <MainLayout >
            <PageHeader title='User List' topActions={[
                <Button size='large' icon={<FileExcelOutlined />} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Import</Button>,
                <Button size='large' type='primary'>New User</Button>
            ]} />
            <FilterSection

                selectedRows={selectedRowKeys}
                batchActionMenus={batchActionMenus}
                filters={
                    [
                        <Select placeholder='Gender' defaultValue={filters.gender} options={genderOptions} onChange={handleFilterGender} allowClear style={{ width: '90px' }} />,
                        <DateRangePicker range={10} onChange={handleRange} />,
                    ]
                } />
            <DataTable
                rowSelection={{ selectedRowKeys, onChange: onSelectChange }}
                columns={columns}
                dataSource={props?.data.map(item => ({ ...item, key: item.id }))}
                total={props?.meta?.total}
                perPage={props.meta.perPage}
            />
        </MainLayout>
    );
};

export default UsersPage;
