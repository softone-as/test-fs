import React, { useEffect, useMemo, useState } from 'react'
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
import { Link } from '@inertiajs/inertia-react';
import {
    BellOutlined,
    DashboardOutlined,
    MailOutlined, UserOutlined
} from "@ant-design/icons";
import { Inertia } from '@inertiajs/inertia'
import { sidebarThemeConfig } from '../../Utils/theme';
import { PageProgress } from '../../Components/molecules/Progress';
import Breadcrumbs from '../../Components/molecules/Breadcrumbs/Breadcrumbs';
import { BreadcrumbsItem } from '../../Modules/Common/Entities';
import { Route } from '../../Enums/Route';


export type IProps = {
    children: React.ReactNode
    headerRightMenu?: React.FC
    breadcrumbItems?: BreadcrumbsItem[]
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
        key: '4',
        label: 'Sample Detail',
        icon: <MailOutlined />,
        theme: 'light',
        children: [
            {
                key: '4-1',
                label: <Link href='/sample/detail/basic'>Detail Basic</Link>,
            },
            {
                key: '4-2',
                label: <Link href='/sample/detail/advanced'>Detail Advanced</Link>,
            },
        ]

    },
    {
        key: Route.Logout,
        label: <Link href='#' onClick={handleLogout}>Logout</Link>,
        icon: <MailOutlined />,

    },
]

const { Sider, Content } = Layout
const { Text } = Typography

export const MainLayout: React.FC<IProps> = ({ children, breadcrumbItems = [] }: IProps) => {
    const [loading, setLoading] = useState(false);

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
                    <Menu
                        items={menuItems}
                        theme='light'
                        style={{ backgroundColor: '#006D75' }}
                        mode='inline'
                        defaultOpenKeys={[defaultOpenedKey]}
                        selectedKeys={[activeMenuKey]}
                    />
                </ConfigProvider>
            </Sider>
            <Layout>
                <Content
                    style={{
                        padding: "16px 28px",
                    }}
                >
                    <Breadcrumbs breadcrumb={breadcrumbItems} />

                    {children}

                </Content>
            </Layout>
        </Layout>

    )
}
