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
import { Link } from '@inertiajs/inertia-react';
import {
    BellOutlined,
    DashboardOutlined,
    MailOutlined, UserOutlined
} from "@ant-design/icons";
import { Inertia } from '@inertiajs/inertia'
import { sidebarThemeConfig } from '../../Utils/theme';
import { PageProgress } from '../../Components/molecules/Progress';
import { Route } from '../../Enums/Route';


export type IProps = {
    children: React.ReactNode
    headerRightMenu?: React.FC

}
interface MenuItem {
    key: string;
    label: React.ReactNode;
    icon: React.ReactNode;
    theme?: string;
    children?: Array<{ key: string, label: React.ReactNode }>;
}

const handleLogout = () => {
    const isOk = confirm("Are you sure to logout? ")

    if (isOk) {
        Inertia.get('/auth/logout')
    }
}


const SidebarMenu: MenuItem[] = [
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
        key: Route.Logout,
        label: <Link href='#' onClick={handleLogout}>Logout</Link>,
        icon: <MailOutlined />,

    },
]

const { Sider, Content } = Layout
const { Text } = Typography

const rootSubmenuKeys = SidebarMenu.map((menu) => {
    const menuKey = menu.key;
    return menuKey;
})


export const MainLayout: React.FC<IProps> = ({ children }: IProps) => {
    const [loading, setLoading] = useState(false);
    const [openKeys, setOpenKeys] = useState(null);
    const [selectKeys, setSelectKeys] = useState(null);

    const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
        const latestOpenKey = keys.find((key) => openKeys?.indexOf(key) === -1);
        if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };

    useEffect(() => {
        SidebarMenu.find((item) => {
            const active = window.location.pathname;
            if (item.key == active) {
                setSelectKeys(item.key);
            }
            item?.children?.find((chil) => {
                if (chil.key === active) {
                    setSelectKeys(chil.key);
                    setOpenKeys([item.key]);
                }
            })
        })
    }, []);

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
                        items={SidebarMenu}
                        theme='light'
                        style={{ backgroundColor: '#006D75' }}
                        mode='inline'
                        openKeys={openKeys}
                        onOpenChange={onOpenChange}
                        selectedKeys={selectKeys} />
                </ConfigProvider>
            </Sider>
            <Layout>
                <Content
                    style={{
                        padding: "28px 24px",
                    }}
                >
                    {children}

                </Content>
            </Layout>
        </Layout>

    )
}