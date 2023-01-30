import React from 'react'
import {
    Layout,
    Typography,
    Space,
    Menu,
    ConfigProvider,
    Avatar,
    Badge
} from "antd";
import type { MenuProps } from 'antd'
import { Link } from '../../Components/atoms/Link';
import {
    BellOutlined,
    MailOutlined, UserOutlined
} from "@ant-design/icons";
import Title from 'antd/es/typography/Title';
import { Inertia } from '@inertiajs/inertia'
import { sidebarThemeConfig } from '../../Utils/theme';


export type IProps = {
    title?: string,
    children: React.ReactNode
    headerRightMenu?: React.FC
}

const handleLogout = () => {
    const isOk = confirm("Are you sure to logout? ")

    if (isOk) {
        Inertia.get('/auth/logout')
    }
}

const SidebarMenu: MenuProps['items'] = [
    {
        key: '1',
        label: <Link href='/dashboard/page'>Dashboard</Link>,
        icon: <MailOutlined />,

    },
    {
        key: '2',
        label: <Link href='/users'>Users</Link>,
        icon: <MailOutlined />,
        theme: 'light',

    },
    {
        key: '3',
        label: 'Sample Form',
        icon: <MailOutlined />,
        theme: 'light',
        children: [
            {
                key: '3-1',
                label: <Link href='/sample/form/basic'>Form Basic</Link>,
            },
            {
                key: '3-2',
                label: <Link href='/sample/form/step'>Form Step</Link>,
            },
            {
                key: '3-3',
                label: <Link href='/sample/form/advanced'>Form Advanced</Link>,
            },
        ]

    },
    {
        key: '5',
        label: <Link href='#' onClick={handleLogout}>Logout</Link>,
        icon: <MailOutlined />,

    },
]



const { Sider, Content } = Layout
const { Text } = Typography


export const Dashboard: React.FC<IProps> = ({ title, children }: IProps) => {
    return (

        <Layout style={{ minHeight: '100vh' }}>
            <Sider theme='light' style={{ backgroundColor: '#006D75', }} >
                <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: '64px', borderBottom: '1px solid rgba(0, 0, 0, 0.06)', padding: '0rem 1rem' }}>
                    {/* Apps Logo or Title */}
                    <Space>
                        <Avatar size="default" icon={<UserOutlined />} />
                        <Text
                            style={{
                                fontWeight: "500",
                                fontSize: "18px",
                                color: "#ffffff",
                                textAlign: 'center',
                                lineHeight: '32px'
                            }}
                        >
                            Company
                        </Text>
                    </Space>
                </div>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '58px', borderBottom: '1px solid rgba(0, 0, 0, 0.06)' }}>
                    <Space size='middle'>
                        {/* User Icon */}
                        <Avatar size="default" icon={<UserOutlined />} />

                        <Space.Compact direction='vertical' size='small'>
                            {/* Username */}
                            <Text
                                style={{
                                    fontWeight: "500",
                                    fontSize: "14px",
                                    color: "#ffffff",
                                    textAlign: 'center',
                                }}
                            >
                                User Profile
                            </Text>

                            {/* User Role */}
                            <Text style={{ fontSize: '12px', color: '#B5F5EC' }}>Admin</Text>
                        </Space.Compact>
                        <Badge dot>
                            <BellOutlined style={{ color: 'white', fontSize: '16px' }} />
                        </Badge>
                    </Space>
                </div>

                <ConfigProvider theme={sidebarThemeConfig}>
                    <Menu items={SidebarMenu} theme='light' style={{ backgroundColor: '#006D75', }} mode='inline' />
                </ConfigProvider>
            </Sider>
            <Layout>
                <Content style={{
                    padding: "32px",
                }}>
                    <Space direction='vertical' size={32} style={{ width: '100%', minHeight: '100%' }}>
                        {/* Header Menu */}
                        <Space>
                            <Title>{title}</Title>
                        </Space>

                        {children}
                    </Space>
                </Content>
            </Layout>
        </Layout>

    )
}