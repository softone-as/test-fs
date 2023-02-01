import { PageHeader } from '../../../Components/molecules/Headers';
import React from 'react';

import { MainLayout } from '../../../Layouts/MainLayout';
import { Button, Descriptions, Space, Typography } from 'antd';
import { DeleteOutlined, DownloadOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { IUser } from '../../../Modules/User/Entities';
import { ColumnsType } from 'antd/es/table';
import { Link } from '@inertiajs/inertia-react';
import { iconActionTableStyle } from '../../../Utils/theme';
import { TInertiaProps } from '../../../Modules/Inertia/Entities';
import { DataTable } from '../../../Components/organisms/DataTable';
import { Breadcrumbs } from '../../../Enums/Breadcrumb';

const columns: ColumnsType<IUser> = [
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
        title: 'Identity Number',
        dataIndex: 'identityNumber',
        key: 'identityNumber',
    },
    {
        title: 'Phone Number',
        dataIndex: 'phoneNumber',
        key: 'phoneNumber',
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

const data: IUser[] = [
    {
        id: 1,
        fullname: 'John Cena',
        email: 'john@cena.com',
        password: '4123',
        identityNumber: '231',
        phoneNumber: '0841231322',
    }
]


const labelWrapperStyle = {
    width: '20%'
}

const buttonWithIconStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}

interface IProps extends TInertiaProps {
    data: IUser,
}

const UserDetailPage: React.FC = (props: IProps) => {
    const { id, identityNumber, email, fullname, phoneNumber, gender } = props.data

    return (
        <MainLayout breadcrumbItems={Breadcrumbs.Users.DETAIL} >
            <PageHeader title='Detail User' topActions={[
                <Button size='large' icon={<DeleteOutlined />} style={buttonWithIconStyle}>Delete</Button>,
                <Button size='large' icon={<EditOutlined />} style={buttonWithIconStyle}>Edit</Button>,
                <Button size='large' icon={<DownloadOutlined />} style={buttonWithIconStyle}>Download</Button>,
                <Button size='large' type='primary'>Action</Button>,
            ]} />

            <Descriptions title='User Info' size='small' bordered column={2} labelStyle={labelWrapperStyle} style={{ backgroundColor: '#fff', borderRadius: 8, padding: '15px 24px' }}>
                <Descriptions.Item label='ID'>{id}</Descriptions.Item>
                <Descriptions.Item label='Name'>{fullname}</Descriptions.Item>
                <Descriptions.Item label='No Telephone'>{phoneNumber}</Descriptions.Item>
                <Descriptions.Item label='Email'>{email}</Descriptions.Item>
            </Descriptions>

            <Descriptions title='Advanced Information' size='small' bordered column={2} labelStyle={labelWrapperStyle} contentStyle={{ width: '30%' }} style={{ backgroundColor: '#fff', borderRadius: '8 8 0 0', padding: '15px 24px', marginTop: 24 }}>
                <Descriptions.Item label='Identity Number'>{identityNumber}</Descriptions.Item>
                <Descriptions.Item label='Gender'>{gender}</Descriptions.Item>
                <Descriptions.Item label='Address Link' span={2}>http://collateral.dot.co.id/resources/contracts/new?viaResource=collaterals&viaResourceId=11927&viaRelationship=contracts</Descriptions.Item>
            </Descriptions>


            <div style={{
                backgroundColor: 'rgb(255, 255, 255)',
                borderRadius: '0 0 8 8',
                padding: '15px 24px'
            }}>
                <Typography.Text strong style={{ fontSize: '16px' }}>Table Title</Typography.Text>
                <DataTable<IUser>
                    columns={columns}
                    dataSource={data}
                    total={3}
                    perPage={10}
                    onPageChange={() => { return }}
                />
            </div>

        </MainLayout>
    );
};

export default UserDetailPage;
