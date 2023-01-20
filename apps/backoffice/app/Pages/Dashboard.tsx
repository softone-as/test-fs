import React, { useState } from 'react';
import { DashboardLayout } from '../Layouts/Dashboard';
import { DataTable } from '../Components/organisms/DataTable'
import { ColumnsType } from 'antd/es/table';
import { useTableFilter } from '../Utils/hooks'
import { TInertiaProps } from '../Modules/Inertia/Entities'

type DataType = {
    key: string;
    name: string;
    age: number;
    address: string;
}



const data: DataType[] = []

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


    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };



    return (
        <DashboardLayout title='Hello' >

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
