import React from 'react';
import { DataTable } from '../../../Components/organisms/DataTable';
// import { Inertia } from '@inertiajs/inertia';
// import { CellProps, Column } from 'react-table';

import { DashboardLayout as Layout } from '../../../Layouts/Dashboard';
import type { ColumnsType } from 'antd/es/table'
import { TInertiaProps } from '../../../Modules/Inertia/Entities'

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
    data: DataType[]
}

const UsersPage: React.FC = (props: IProps) => {

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

    return (
        <Layout title='Users'>
            <DataTable columns={columns} dataSource={props?.data.map(item => ({ ...item, key: item.id }))} />
        </Layout>
    );
};

export default UsersPage;
