
import React from 'react';
import { DeleteOutlined, DownloadOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { Badge, Button, Card, Col, Descriptions, Image, Row, Space, Steps, Tabs, TabsProps, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';

import { IUser } from '../../../Modules/User/Entities';
import { iconActionTableStyle } from '../../../Utils/theme';

import { DataTable } from '../../../Components/organisms/DataTable';
import { PageHeader } from '../../../Components/molecules/Headers';
import { MainLayout as Layout } from '../../../Layouts/MainLayout';
import { Breadcrumbs } from '../../../Enums/Breadcrumb';

import { Link } from '@inertiajs/inertia-react';

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
            <Link href='#'><EyeOutlined style={iconActionTableStyle} /></Link >
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
        phoneNumber: '0841231322',
        identityNumber: '231',

    },
    {
        id: 2,
        fullname: 'John Wick',
        email: 'john@wick.com',
        password: '4123',
        identityNumber: '231',
        phoneNumber: '0841231322',

    },
    {
        id: 3,
        fullname: 'John LBF',
        email: 'john@lbf.com',
        password: '4123',
        identityNumber: '231',
        phoneNumber: '0841231322',

    },
]

const contentItemStyle = {
    opacity: '45%'
}

const buttonWithIconStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}

/* eslint-disable @typescript-eslint/naming-convention */
const DetailAdvancedPage: React.FC = () => {
    const tabItems: TabsProps['items'] = [
        {
            key: '1',
            label: `Tab 1`,
            children: <DataTable<IUser>
                columns={columns}
                dataSource={data}
                total={3}
                perPage={10}
                onPageChange={() => { return }}
            />,
        },
        {
            key: '2',
            label: `Tab 2`,
            children: `Content of Tab Pane 2`,
        },
        {
            key: '3',
            label: `Tab 3`,
            children: `Content of Tab Pane 3`,
        },
    ];

    return (
        <Layout breadcrumbItems={Breadcrumbs.Users.DETAIL}>
            <PageHeader title='Detail Advanced' topActions={[
                <Button size='large' icon={<DeleteOutlined />} style={buttonWithIconStyle}>Delete</Button>,
                <Button size='large' icon={<EditOutlined />} style={buttonWithIconStyle}>Edit</Button>,
                <Button size='large' icon={<DownloadOutlined />} style={buttonWithIconStyle}>Download</Button>,
                <Button size='large' type='primary'>Action</Button>,
            ]} />

            <Row gutter={16} justify='space-between'>
                <Col span={6}>
                    <Card>
                        <Space direction='vertical' align='center' style={{ width: '100%' }}>
                            <Image src='https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png' width={90} preview={false} style={{ borderRadius: '50%' }} />
                            <Typography.Text style={{ fontSize: '20px' }} strong>John Cena</Typography.Text>
                        </Space>

                        <Descriptions layout='vertical' column={1} size='small'>
                            <Descriptions.Item contentStyle={contentItemStyle} label='ID'>109820348998734897</Descriptions.Item>
                            <Descriptions.Item contentStyle={contentItemStyle} label='Name'>John Cena</Descriptions.Item>
                            <Descriptions.Item contentStyle={contentItemStyle} label='Email'>john.lbf@gmail.com</Descriptions.Item>
                            <Descriptions.Item contentStyle={contentItemStyle} label='No Telephone'>0812376152345</Descriptions.Item>
                            <Descriptions.Item contentStyle={contentItemStyle} label='Address'>Rectory Cottage, Farleigh Court Road, Warlingham, CR6 9PX</Descriptions.Item>
                        </Descriptions>

                        <Space style={{ marginTop: '1em' }}>
                            Status :
                            <div style={{ border: '1px solid #26262622', padding: '2px 90px 2px 8px' }}>
                                <Badge status="warning" text='Warning' />
                            </div>
                        </Space>
                    </Card>
                </Col>

                <Col span={18}>
                    <Card title='Process progress'>
                        <Steps
                            progressDot
                            current={1}
                            size='small'
                            items={[
                                {
                                    title: <b>Create Project</b>,
                                    description: 'Description Blabla..',
                                },
                                {
                                    title: <b>Department Preliminary Review</b>,
                                    description: 'Description Blabla..',
                                },
                                {
                                    title: <b>Financial Preview </b>,
                                    description: 'Description Blabla..',
                                },
                            ]}
                        />
                    </Card>

                    {/* TODO: flex; space-between for .ant-steps-item-title */}
                    <Card title='Activity Timeline' style={{ margin: '1em 0' }}>
                        <Steps
                            progressDot
                            size='small'
                            direction='vertical'
                            items={[
                                {
                                    title: <b>Seamlessly communicate collaborative expertise through business quality</b>,
                                    description: 'Description timeline',
                                    subTitle: '2 day ago'

                                },
                                {
                                    title: <b>Seamlessly communicate collaborative expertise through business quality</b>,
                                    description: 'Description timeline',
                                    subTitle: '2 day ago'
                                },
                                {
                                    title: <b>Seamlessly communicate collaborative expertise through business quality</b>,
                                    description: 'Description timeline',
                                    subTitle: '2 day ago'
                                },
                            ]}
                        />
                    </Card>

                    <Card>
                        <Tabs defaultActiveKey="1" items={tabItems} />
                    </Card>
                </Col>
            </Row>

        </Layout>
    )
}


export default DetailAdvancedPage;
