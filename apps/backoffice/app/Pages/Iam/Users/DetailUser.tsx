import React from 'react';
import { Link } from '@inertiajs/inertia-react';
import { Button, Descriptions, Space } from 'antd';
import {
    DeleteOutlined,
    DownloadOutlined,
    EditOutlined,
    EyeOutlined,
} from '@ant-design/icons';

import { MainLayout } from '../../../Layouts/MainLayout';
import { IUser } from '../../../Modules/User/Entities';
import { ColumnsType } from 'antd/es/table';
import { defaultSizeSpace, iconActionTableStyle } from '../../../Utils/theme';
import { TInertiaProps } from '../../../Modules/Inertia/Entities';
import { DataTable } from '../../../Components/organisms/DataTable';
import { Breadcrumbs } from '../../../Enums/Breadcrumb';
import { Buttons } from '../../../Components/atoms/Buttons';
import DescriptionContainer from '../../../Components/molecules/DescriptionContainer/DescriptionContainer';
import { Section, SectionHeader } from '../../../Components/molecules/Section';

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
        render: () => (
            <Space size="large">
                <Link href="#">
                    <EyeOutlined style={iconActionTableStyle} />
                </Link>
                <Link href="#">
                    <EditOutlined style={iconActionTableStyle} />
                </Link>
                <Link href="#">
                    <DeleteOutlined style={iconActionTableStyle} />
                </Link>
            </Space>
        ),
    },
];

const data: IUser[] = [
    {
        id: 1,
        fullname: 'John Cena',
        email: 'john@cena.com',
        password: '4123',
        identityNumber: '231',
        phoneNumber: '0841231322',
    },
];

interface IProps extends TInertiaProps {
    data: IUser;
}

const UserDetailPage: React.FC = (props: IProps) => {
    const { id, identityNumber, email, fullname, phoneNumber, gender } =
        props.data;

    return (
        <MainLayout
            title="Detail User"
            breadcrumbs={Breadcrumbs.Users.DETAIL}
            topActions={
                <>
                    <Buttons icon={<DeleteOutlined />}>Delete</Buttons>,
                    <Buttons icon={<EditOutlined />}>Edit</Buttons>,
                    <Buttons icon={<DownloadOutlined />}>Download</Buttons>,
                    <Button type="primary">Action</Button>
                </>
            }
        >
            <Space
                direction="vertical"
                size={defaultSizeSpace}
                style={{ width: '100%' }}
            >
                <Section title="User Info">
                    <DescriptionContainer
                        size="small"
                        bordered
                        column={{ md: 2, xs: 1 }}
                    >
                        <Descriptions.Item label="ID">{id}</Descriptions.Item>
                        <Descriptions.Item label="Name">
                            {fullname}
                        </Descriptions.Item>
                        <Descriptions.Item label="No Telephone">
                            {phoneNumber}
                        </Descriptions.Item>
                        <Descriptions.Item label="Email">
                            {email}
                        </Descriptions.Item>
                    </DescriptionContainer>
                </Section>

                <Section title="Advanced Information">
                    <DescriptionContainer
                        size="small"
                        bordered
                        column={{ md: 2, xs: 1 }}
                    >
                        <Descriptions.Item label="Identity Number">
                            {identityNumber}
                        </Descriptions.Item>
                        <Descriptions.Item label="Gender">
                            {gender}
                        </Descriptions.Item>
                        <Descriptions.Item label="Address Link" span={2}>
                            http://collateral.dot.co.id/resources/contracts/new?viaResource=collaterals&viaResourceId=11927&viaRelationship=contracts
                        </Descriptions.Item>
                    </DescriptionContainer>

                    <SectionHeader
                        title="Table Title"
                        actions={<Button type="primary">Add Data</Button>}
                    />

                    <DataTable<IUser>
                        columns={columns}
                        dataSource={data}
                        rowKey="id"
                        pagination={{
                            current: 1,
                            pageSize: 10,
                            total: 23,
                        }}
                    />
                </Section>
            </Space>
        </MainLayout>
    );
};

export default UserDetailPage;
