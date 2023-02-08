
import React from 'react';
import { DeleteOutlined, DownloadOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { Badge, Col, Descriptions, Image, Row, Space, Steps, Tabs, TabsProps, Timeline, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';

import { IUser } from '../../../Modules/User/Entities';
import { defaultGutter, defaultSizeSpace, iconActionTableStyle } from '../../../Utils/theme';

import { DataTable } from '../../../Components/organisms/DataTable';
import { PageHeader } from '../../../Components/molecules/Headers';
import { TimelinesItem } from '../../../Components/molecules/TimelinesItem';

import { MainLayout as Layout } from '../../../Layouts/MainLayout';
import { Breadcrumbs } from '../../../Enums/Breadcrumb';

import { Link } from '@inertiajs/inertia-react';
import { Buttons } from '../../../Components/atoms/Buttons';
import { DescriptionContainer } from '../../../Components/molecules/DescriptionContainer';
import { Section } from '../../../Components/molecules/Section';


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

const DetailAdvancedPage: React.FC = () => {

    return (
        <Layout breadcrumbItems={Breadcrumbs.Users.DETAIL}>
            <PageHeader title='Detail Advanced' topActions={[
                <Buttons icon={<DeleteOutlined />} >Delete</Buttons>,
                <Buttons icon={<EditOutlined />} >Edit</Buttons>,
                <Buttons icon={<DownloadOutlined />} >Download</Buttons>,
                <Buttons type='primary'>Action</Buttons>,
            ]} />

            <Row gutter={defaultGutter} justify='space-between'>
                <Col md={24} lg={6}>
                    <Section>
                        <Space direction='vertical' size={defaultSizeSpace}>

                            <Space direction='vertical' size={defaultSizeSpace} align='center' style={{ width: '100%' }}>
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

                        </Space>

                        <DescriptionContainer column={1} size='small'>
                            <Descriptions.Item label='Status'>
                                <Badge status="warning" text='Warning' style={{ fontWeight: 400 }} />
                            </Descriptions.Item>
                        </DescriptionContainer>

                    </Section>
                </Col>

                <Col md={24} lg={18}>
                    <Space size={defaultSizeSpace} direction='vertical' style={{ width: '100%' }}>
                        <Section title='Process progress' divider>
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
                        </Section>

                        <Section title='Activity Timeline' divider top>
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
                        </Section>

                        <Section>
                            <Tabs defaultActiveKey="1" items={tabItems} />
                        </Section>
                    </Space>
                </Col>
            </Row>

        </Layout>
    )
}


export default DetailAdvancedPage;
