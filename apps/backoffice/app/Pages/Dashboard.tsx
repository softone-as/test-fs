import React from 'react';
import { DashboardLayout } from '../Layouts/Dashboard';
import { DataTable } from '../Components/organisms/DataTable'
import { ColumnsType } from 'antd/es/table';
import { Filters } from '../Components/molecules/Filters';
import { TFilter } from '../Components/molecules/Filters/Entities';
import { useTableFilter } from '../Utils/hooks'
import { TInertiaProps } from '../Modules/Inertia/Entities'

type DataType = {
    key: string;
    name: string;
    age: number;
    address: string;
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
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
    },
]

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
];


type IProps = TInertiaProps

const Dashboard = (props: IProps): JSX.Element => {

    const { setQueryParams, filters } = useTableFilter<DataType>()

    const handleSearch = (val) => {
        return setQueryParams({ search: val })
    }

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
            }
        }
    ]


    return (
        <DashboardLayout title='Hello' >
            <Filters filters={filterList} handleSearch={handleSearch} />
            <DataTable<DataType> columns={columns} dataSource={data} />
        </DashboardLayout>
    )
};

export default Dashboard;
