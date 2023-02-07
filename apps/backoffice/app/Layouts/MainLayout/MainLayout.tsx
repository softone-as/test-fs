import React, { useEffect, useMemo, useState } from 'react'
import {
    Layout,
    Typography,
    Space,
    Menu,
    ConfigProvider,
    Avatar,
    Badge,
    Tooltip
} from "antd";
import type { MenuProps } from 'antd'
import { Link, usePage } from '@inertiajs/inertia-react';
import {
    BellOutlined,
    DashboardOutlined,
    LogoutOutlined,
    MailOutlined, UserOutlined
} from "@ant-design/icons";
import { Inertia, Page } from '@inertiajs/inertia'
import { sidebarThemeConfig } from '../../Utils/theme';
import { PageProgress } from '../../Components/molecules/Progress';
import { TInertiaProps } from '../../Modules/Inertia/Entities';
import { Route } from '../../Enums/Route';


export type IProps = {
    children: React.ReactNode
    headerRightMenu?: React.FC
}

const handleLogout = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent> |
    React.KeyboardEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    const isOk = confirm("Are you sure to logout? ")

    if (isOk) {
        Inertia.get('/auth/logout')
    }
}

type MenuItem = Required<MenuProps>['items'][number];

const menuItems: MenuItem[] = [
    {
        key: Route.Dashboard,
        label: <Link href={Route.Dashboard} >Dashboard</Link>,
        icon: <DashboardOutlined />,

    },
    {
        key: '#IAM',
        label: 'IAM',
        icon: <MailOutlined />,
        theme: 'light',
        children: [
            {
                key: Route.Users,
                label: <Link href={Route.Users}>Users</Link>,

            },
            {
                key: Route.Roles,
                label: <Link href={Route.Roles}>Roles</Link>,

            },
            {
                key: Route.Permissions,
                label: <Link href={Route.Permissions}>Permissions</Link>,

            }
        ]

    },
]

const { Sider, Content } = Layout
const { Text } = Typography

export const MainLayout: React.FC<IProps> = ({ children }: IProps) => {
    const { props: pageProps } = usePage<Page<TInertiaProps>>()
    const [loading, setLoading] = useState(false)

    // active menu item key
    const activeMenuKey = useMemo(() => window.location.pathname, [window.location.pathname]);

    // key of parent's active menu item
    const defaultOpenedKey = useMemo(() => menuItems.find((item) => {
        if ('children' in item) {
            const openedMenuItem = item.children?.find((chil) => {
                return chil.key === activeMenuKey
            })
            return openedMenuItem !== undefined
        }
    })?.key as string, [menuItems, activeMenuKey]);

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

        // Fix height, so the scroll will be belongs to Content only
        <Layout style={{ height: '100vh' }}>
            {
                loading && <PageProgress />

            }
            <Sider theme='light' style={{ backgroundColor: '#006D75', height: '100vh' }} width="222px">
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
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

                    {pageProps.userDetail && (
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
                                        }}
                                    >
                                        {pageProps.userDetail?.fullname}
                                    </Text>

                                    {/* User Roles */}
                                    <Text style={{ fontSize: '12px', color: '#B5F5EC' }}>
                                        {pageProps.userDetail.roles?.map(r => r.name).join(', ')}
                                    </Text>
                                </Space.Compact>
                            </Space>

                            {/* Notification Icon */}
                            <Tooltip title='Notifications' placement='right'>
                                <Link href='/notifications'>
                                    <Badge dot={pageProps.notifications?.notificationUnread > 0}>
                                        <BellOutlined style={{ color: 'white', fontSize: '24px' }} />
                                    </Badge>
                                </Link>
                            </Tooltip>
                        </div>
                    )}

                    <ConfigProvider theme={sidebarThemeConfig}>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <Menu
                                items={menuItems}
                                theme='light'
                                style={{ backgroundColor: '#006D75' }}
                                mode='inline'
                                defaultOpenKeys={[defaultOpenedKey]}
                                selectedKeys={[activeMenuKey]}
                            />

                            {/* Bottom Menu */}
                            <Menu theme='light' style={{ backgroundColor: '#006D75' }} mode='inline'>
                                <Menu.Divider />
                                {/* Logout Button */}
                                <Menu.Item key="logout" icon={<LogoutOutlined />}>
                                    <Link href='#' onClick={handleLogout}>Logout</Link>
                                </Menu.Item>
                            </Menu>
                        </div>

                    </ConfigProvider>
                </div>
            </Sider >
            <Layout>
                <Content
                    style={{
                        padding: "28px 24px",
                        overflow: "auto",
                    }}
                >
                    {children}
                </Content>
            </Layout>
        </Layout >

    )
}
