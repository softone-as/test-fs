
import React from 'react';
import { DeleteOutlined, DownloadOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { Badge, Card, Col, Descriptions, Grid, Image, Row, Space, Steps, Tabs, TabsProps, Timeline, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';

import { IUser } from '../../../Modules/User/Entities';
import { iconActionTableStyle } from '../../../Utils/theme';

import { DataTable } from '../../../Components/organisms/DataTable';
import { PageHeader } from '../../../Components/molecules/Headers';
import { TimelinesItem } from '../../../Components/molecules/TimelinesItem';

import { MainLayout as Layout } from '../../../Layouts/MainLayout';
import { Breadcrumbs } from '../../../Enums/Breadcrumb';

import { Link } from '@inertiajs/inertia-react';
import { Buttons } from '../../../Components/atoms/Buttons';
import { DescriptionContainer } from '../../../Components/molecules/DescriptionContainer';


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

/* eslint-disable @typescript-eslint/naming-convention */
const DetailAdvancedPage: React.FC = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { sm } = Grid.useBreakpoint()

    return (
        <Layout breadcrumbItems={Breadcrumbs.Users.DETAIL}>
            <PageHeader title='Detail Advanced' topActions={[
                <Buttons icon={<DeleteOutlined />} >Delete</Buttons>,
                <Buttons icon={<EditOutlined />} >Edit</Buttons>,
                <Buttons icon={<DownloadOutlined />} >Download</Buttons>,
                <Buttons type='primary'>Action</Buttons>,
            ]} />

            <Row gutter={[16, sm ? 16 : 0]} justify='space-between'>
                <Col md={24} lg={6}>
                    <Card>
                        <Space direction='vertical' align='center' style={{ width: '100%', marginBottom: '16px' }}>
                            <Image src='https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png' width={90} preview={false} style={{ borderRadius: '50%' }} />
                            <Typography.Text style={{ fontSize: '20px' }} strong>John Cena</Typography.Text>
                        </Space>

                        <DescriptionContainer layout='vertical' column={{ xl: 1, lg: 1, md: 2, sm: 1, xs: 1 }} size='small'>
                            <Descriptions.Item label='ID'>109820348998734897</Descriptions.Item>
                            <Descriptions.Item label='Name'>John Cena</Descriptions.Item>
                            <Descriptions.Item label='Email'>john.lbf@gmail.com</Descriptions.Item>
                            <Descriptions.Item label='No Telephone'>0812376152345</Descriptions.Item>
                            <Descriptions.Item label='Address'>Rectory Cottage, Farleigh Court Road, Warlingham, CR6 9PX</Descriptions.Item>
                        </DescriptionContainer>

                        <DescriptionContainer column={1} size='small'>
                            <Descriptions.Item label='Status'>
                                <Badge status="warning" text='Warning' style={{ fontWeight: 400 }} />
                            </Descriptions.Item>
                        </DescriptionContainer>
                    </Card>
                </Col>

                <Col md={24} lg={18}>
                    <Card title='Process progress'>
                        <Steps
                            progressDot
                            current={1}
                            size='small'
                            items={[
                                {
                                    title: <Typography.Text style={{ lineHeight: '22px', fontWeight: 600, fontSize: '14px' }}>Create Project</Typography.Text>,
                                    description: 'Description Blabla..',
                                },
                                {
                                    title: <Typography.Text style={{ lineHeight: '22px', fontWeight: 600, fontSize: '14px' }}>Department Preliminary Review</Typography.Text>,
                                    description: 'Description Blabla..',
                                },
                                {
                                    title: <Typography.Text style={{ lineHeight: '22px', fontWeight: 600, fontSize: '14px' }}>Financial Preview </Typography.Text>,
                                    description: 'Description Blabla..',
                                },
                            ]}
                        />
                    </Card>

                    <Card title='Activity Timeline' style={{ margin: '1em 0' }}>
                        <Timeline>
                            <TimelinesItem
                                title='Seamlessly communicate collaborative expertise through business quality'
                                description='Description timeline'
                                time='2 day ago'
                            />
                            <TimelinesItem
                                title='Seamlessly communicate collaborative expertise through business quality'
                                description='Description timeline'
                                time='2 day ago'
                            />
                            <TimelinesItem
                                title='Seamlessly communicate collaborative expertise through business quality'
                                description='Description timeline'
                                time='2 day ago'
                            />
                        </Timeline>
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
