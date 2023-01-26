import React, { useEffect, useState } from 'react'
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
    DashboardOutlined,
    MailOutlined, UserOutlined
} from "@ant-design/icons";
import Title from 'antd/es/typography/Title';
import { Inertia } from '@inertiajs/inertia'
import { sidebarThemeConfig } from '../../Utils/theme';
import { PageProgress } from '../../Components/molecules/Progress';


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
        label: <Link href='/' >Dashboard</Link>,
        icon: <DashboardOutlined />,

    },
    {
        key: '2',
        label: 'IAM',
        icon: <MailOutlined />,
        theme: 'light',

        children: [
            {
                key: 'users',
                label: <Link href='/users'>Users</Link>,

            },
            {
                key: 'roles',
                label: <Link href='/roles'>Roles</Link>,

            },
            {
                key: 'permissions',
                label: <Link href='/permissions'>Permissions</Link>,

            }
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


export const MainLayout: React.FC<IProps> = ({ title, children }: IProps) => {
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const inertiaStart = Inertia.on('start', () => {

            setLoading(true)
        })

        const inertiaFinish = Inertia.on('finish', (event) => {

            if (event.detail.visit.completed) {
                setLoading(false)
            }
            else if (event.detail.visit.interrupted) {
                setLoading(false)
            }
            else if (event.detail.visit.cancelled) {
                setLoading(false)
            }
        })

        return () => {
            inertiaStart()
            inertiaFinish()
        }
    })
    return (

        <Layout style={{ minHeight: '100vh' }}>
            {
                loading && <PageProgress />

            }
            <Sider theme='light' style={{ backgroundColor: '#006D75' }} width="222px">
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
                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '58px', padding: '8px 16px', marginBottom: '14px' }}>

                    {/* User Icon */}
                    <Space size='small'>
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
                                Rio Irawan
                            </Text>

                            {/* User Role */}
                            <Text style={{ fontSize: '12px', color: '#B5F5EC' }}>Admin</Text>
                        </Space.Compact>
                    </Space>
                    <Badge dot>
                        <BellOutlined style={{ color: 'white', fontSize: '24px' }} />
                    </Badge>

                </div>

                <ConfigProvider theme={sidebarThemeConfig}>
                    <Menu items={SidebarMenu} theme='light' style={{ backgroundColor: '#006D75' }} mode='inline' />
                </ConfigProvider>
            </Sider>
            <Layout>
                <Content style={{
                    padding: "28px 24px",
                }}>
                    <Space direction='vertical' size={16} style={{ width: '100%', minHeight: '100%', }}>
                        {/* Header Menu */}
                        <Space>
                            <Title style={{ fontSize: '24px', lineHeight: '32px' }}>{title}</Title>
                        </Space>

                        {children}
                    </Space>
                </Content>
            </Layout>
        </Layout>

    )
}