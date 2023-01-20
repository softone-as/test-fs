import React, { useState } from 'react';
import { DataTable } from '../../../Components/organisms/DataTable';
// import { Inertia } from '@inertiajs/inertia';
// import { CellProps, Column } from 'react-table';

import { DashboardLayout as Layout } from '../../../Layouts/Dashboard';
import type { ColumnsType } from 'antd/es/table'
import { TInertiaProps } from '../../../Modules/Inertia/Entities'
import { useTableFilter } from '../../../Utils/hooks'
import { useNotification } from '../../../Utils/notification'
import { useModal } from '../../../Utils/modal'
import { Filters } from '../../../Components/molecules/Filters'
import { TRowActionMenu, TFilter } from '../../../Components/molecules/Filters/Entities'

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

    console.log(props)
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

    const filterList: TFilter[] = [
        {
            type: 'dropdown',
            dropDownFilter: {
                title: 'Status',
                itemsMenu: [
                    {
                        key: '1',
                        label: 'Done',
                        onClick: () => setQueryParams({ status: 'done' })

                    }
                ]
            }
        }, {
            type: 'datePicker',
            datePickerFilter: {
                onChange: (val) => setQueryParams({ date: val.toISOString() })
            },

        }, {
            type: 'dateRange',
            dateRangePickerFilter: {
                range: 7,
                onChange: (val) => alert('test ')
            }
        }
    ]

    const handleSearch = (val) => {
        return setQueryParams({ search: val })
    }

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowActionMenu: TRowActionMenu = [
        {
            key: '1',
            label: 'Share',
            onClick: () => useNotification({ type: 'success', message: 'Hello Woi', description: 'What`s up bro!!' })
        },
        {
            key: '2',
            label: 'Delete',
            onClick: () => useModal({ type: 'confirm', title: 'Delete', content: 'Wis yakin ta?', onOk: () => alert('OK BOS!'), onCancel: () => alert('Cancel Bos!') })
        }
    ]

    return (
        <Layout title='Users'>
            <Filters filters={filterList} handleSearch={handleSearch} selectedRow={selectedRowKeys} rowActions={rowActionMenu} />
            <DataTable
                rowSelection={{ selectedRowKeys, onChange: onSelectChange }}
                columns={columns}
                dataSource={props?.data.map(item => ({ ...item, key: item.id }))}
                total={props?.meta?.total}
                defaultPageSize={props.meta.totalPage}
                onPageChange={(page) => setQueryParams({ page: page.toString() })}
            />
        </Layout>
    );
};

export default UsersPage;
