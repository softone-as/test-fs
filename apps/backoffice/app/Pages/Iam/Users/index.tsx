import React, { useState } from 'react';
import { DataTable } from '../../../Components/organisms/DataTable';
// import { Inertia } from '@inertiajs/inertia';
// import { CellProps, Column } from 'react-table';

import { MainLayout } from '../../../Layouts/MainLayout';
import type { ColumnsType } from 'antd/es/table'
import { TInertiaProps } from '../../../Modules/Inertia/Entities'
import { useTableFilter } from '../../../Utils/hooks'
import { useModal } from '../../../Utils/modal'
import { FilterSection } from '../../../Components/organisms/FilterSection'
import { Button, MenuProps } from 'antd';
import { DateRangePicker, DatePicker, TRangeValue } from '../../../Components/molecules/Pickers';
import type { Dayjs } from 'dayjs'
import { FormSelect } from '../../../Components/molecules/Forms'
import { MultiFilterDropdown } from '../../../Components/molecules/Dropdowns';
import { PageHeader } from '../../../Components/molecules/Headers';
import { FileExcelOutlined } from '@ant-design/icons';



type DataType = {
    birthDate: string,
    email: string,
    emailVerifiedAt: string,
    fullname: string,
    gender: string,
    id: number,
    identityNumber: string,
    oneSignalPlayerIds: string,
    password: string,
    phoneNumber: string,
    phoneNumberVerifiedAt: string
}

interface IProps extends TInertiaProps {
    data: DataType[],
}

const UsersPage: React.FC = (props: IProps) => {


    const { setQueryParams } = useTableFilter<DataType>()
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])

    const columns: ColumnsType<DataType> = [
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

    ]

    const handleSearch = (val) => {
        return setQueryParams({ search: val })
    }

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const MenuItems: MenuProps['items'] = [
        {
            key: 'done',
            label: 'Done',


        }
    ]

    const ActionMenus: MenuProps['items'] = [
        {
            key: '1',
            label: 'Delete',
            onClick: () => useModal({ title: 'Are You Sure? ', type: 'warning', onOk: () => alert('Ok Delete') })
        }
    ]

    const handleRange = (val: TRangeValue) => console.log(val.map(item => item.toDate()))
    const handleDate = (val: Dayjs) => console.log(val.toDate())


    const handleStatus = (data) => {
        console.log('DATa Status: ', data)
    }

    return (
        <MainLayout title='Users'>
            {/* Header Menu */}

            <PageHeader title='User List' rightMenu={[
                <Button size='large' icon={<FileExcelOutlined />} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Import</Button>,
                <Button size='large' type='primary'>New User</Button>
            ]} />
            <FilterSection searchHandler={handleSearch}
                selectedRows={selectedRowKeys}
                rowActionMenus={ActionMenus}
                filters={
                    [
                        <MultiFilterDropdown title='Filter' forms={[
                            <FormSelect label='Status' placeholder="Status" onChange={handleStatus} options={[{ label: 'Done', value: 'done' }]} />,
                            <FormSelect label='Status kedua' placeholder="Status" options={[{ label: 'Done', value: 'done' }, { label: 'Pending', value: 'pending' }]} />,
                            <FormSelect placeholder="Status" options={[{ label: 'Done', value: 'done' }, { label: 'Pending', value: 'pending' }]} />
                        ]}
                        />,
                        <FormSelect placeholder="Status" onChange={handleStatus} options={[{ label: 'Done', value: 'done' }]} />,
                        <DateRangePicker range={10} onChange={handleRange} />,
                        <DatePicker onChange={handleDate} />
                    ]
                } />
            <DataTable
                rowSelection={{ selectedRowKeys, onChange: onSelectChange }}
                columns={columns}
                dataSource={props?.data.map(item => ({ ...item, key: item.id }))}
                total={props?.meta?.total}
                defaultPageSize={props.meta.totalPage}
                onPageChange={(page) => setQueryParams({ page: page.toString() })}
            />
        </MainLayout>
    );
};

export default UsersPage;
