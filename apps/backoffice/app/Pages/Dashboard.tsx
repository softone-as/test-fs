import React, { useState } from 'react';
import { DashboardLayout } from '../Layouts/Dashboard';
import { DataTable } from '../Components/organisms/DataTable'
import { ColumnsType } from 'antd/es/table';
import { Filters } from '../Components/molecules/Filters';
import { TFilter, TRowActionMenu } from '../Components/molecules/Filters/Entities';
import { useTableFilter } from '../Utils/hooks'
import { TInertiaProps } from '../Modules/Inertia/Entities'
import { useNotification } from '../Utils/notification'
import { useModal } from '../Utils/modal'

type DataType = {
    key: string;
    name: string;
    age: number;
    address: string;
}



const data: DataType[] = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',

    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',

    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',

    },
    {
        key: '4',
        name: 'Joe Black',
        age: 34,
        address: 'Sidney No. 1 Lake Park',

    },
    {
        key: '5',
        name: 'Joe Black',
        age: 2,
        address: 'Sidney No. 1 Lake Park',

    },
    {
        key: '6',
        name: 'Joe Black',
        age: 21,
        address: 'Sidney No. 1 Lake Park',

    },
    {
        key: '7',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',

    },
    {
        key: '8',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',

    },
    {
        key: '9',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',

    },
    {
        key: '10',
        name: 'Joe Black',
        age: 34,
        address: 'Sidney No. 1 Lake Park',

    },
    {
        key: '11',
        name: 'Joe Black',
        age: 2,
        address: 'Sidney No. 1 Lake Park',

    },
    {
        key: '12',
        name: 'Joe Black',
        age: 21,
        address: 'Sidney No. 1 Lake Park',

    },
    {
        key: '13',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',

    },
    {
        key: '14',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',

    },
    {
        key: '15',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',

    },
    {
        key: '16',
        name: 'Joe Black',
        age: 34,
        address: 'Sidney No. 1 Lake Park',

    },
    {
        key: '17',
        name: 'Joe Black',
        age: 2,
        address: 'Sidney No. 1 Lake Park',

    },
    {
        key: '18',
        name: 'Joe Black',
        age: 21,
        address: 'Sidney No. 1 Lake Park',

    },
    {
        key: '19',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',

    },
    {
        key: '20',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',

    },
    {
        key: '21',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',

    },
    {
        key: '22',
        name: 'Joe Black',
        age: 34,
        address: 'Sidney No. 1 Lake Park',

    },
    {
        key: '23',
        name: 'Joe Black',
        age: 2,
        address: 'Sidney No. 1 Lake Park',

    },
    {
        key: '24',
        name: 'Joe Black',
        age: 21,
        address: 'Sidney No. 1 Lake Park',

    },
];


type IProps = TInertiaProps

const Dashboard = (props: IProps): JSX.Element => {

    const { setQueryParams, filters } = useTableFilter<DataType>()
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])

    const handleSearch = (val) => {
        return setQueryParams({ search: val })
    }

    const columns: ColumnsType<DataType> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,

        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
            sorter: (a, b) => {
                return a.age - b.age
            }
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
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
        <DashboardLayout title='Hello' >
            <Filters filters={filterList} handleSearch={handleSearch} selectedRow={selectedRowKeys} rowActions={rowActionMenu} />
            <DataTable<DataType>
                rowSelection={{ selectedRowKeys, onChange: onSelectChange }}
                columns={columns}
                dataSource={data}
                total={props?.meta?.totalPage}
                defaultPageSize={props?.meta?.perPage}
                onPageChange={(page) => setQueryParams({ page: page.toString() })}
            />

        </DashboardLayout>
    )
};

export default Dashboard;
