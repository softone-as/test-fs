import React from 'react'
import Head from '../../Components/atoms/Commons/Head.atom';
import { Inertia } from '@inertiajs/inertia'
import {
    Breadcrumb,
    Layout,
    Typography,
    Space,
    Avatar,
    Dropdown,
    Menu,
    Divider,
    ConfigProvider
} from "antd";
import type { MenuProps } from 'antd'
import { Link } from '../../Components/atoms/Link';
import {
    UserOutlined,
    MailOutlined,
    QuestionCircleOutlined,
    BellOutlined
} from "@ant-design/icons";


type BreadcrumbItem = {
    label: string;
    href: string;
};
export type IProps = {
    title?: string,
    children: React.ReactNode
    breadcrumbs?: BreadcrumbItem[]
}


//DROP DOWN MENU
const items: MenuProps['items'] = [
    {
        key: '1',
        label: 'Logout',
        onClick: () => {
            const isOk = confirm(
                "Are you sure to logout?"
            );
            if (isOk) {
                window.location.host !== process.env.STORY_HOST ? Inertia.get('/auth/logout?one_signal_player_id=null') : alert('Logging out')
            }
        },

    }
]

const SidebarMenu: MenuProps['items'] = [
    {
        key: '1',
        label: <Link href='/dashboard/page'>Dashboard</Link>,
        icon: <MailOutlined />,


    },
    {
        key: '2',
        label: 'Products',
        icon: <MailOutlined />,
        theme: 'light',
        children: [{
            key: '3',
            label: <Link href='/products/men'>Men</Link>,

        }, {
            key: '4',
            label: <Link href='/products/Women'>Women</Link>,
        },]
    }
]



const { Sider, Header, Content } = Layout
const { Text } = Typography

export const Main: React.FC<IProps> = ({ title = 'Hello World', breadcrumbs, children }: IProps) => {
    return (
        <>
            {window.location.host !== process.env.STORY_HOST ? <Head title={title} /> : null}
            <Layout style={{ minHeight: '100vh' }}>
                <Sider theme='light' collapsible style={{ backgroundColor: '#006D75', }} >
                    <div style={{ height: '64px', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Text
                            style={{
                                fontWeight: "600",
                                fontSize: "16px",
                                color: "#ffffff",
                                textAlign: 'center'
                            }}
                        >
                            {title}
                        </Text>
                    </div>
                    <Divider />
                    <ConfigProvider theme={{
                        components: {
                            Menu: {
                                colorItemText: '#ffffff',
                                colorItemTextHover: '#ffffff',
                                colorItemTextSelected: '#ffffff',
                                colorItemBgHover: '#08979C',
                                colorItemBgSelected: '#08979C',
                                fontSize: 14,
                            }
                        }
                    }}>
                        <Menu items={SidebarMenu} theme='light' style={{ backgroundColor: '#006D75', }} mode='inline' />
                    </ConfigProvider>
                </Sider>
                <Layout>
                    <Header
                        style={{
                            padding: "0px 24px 0px 0px",
                            height: "64px",
                            background: "#ffffff",
                            borderBottom: "1px solid #E7E8F2",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "end",
                            lineHeight: "inherit",
                            position: "sticky",
                            top: 0,
                            zIndex: 10,
                        }}
                    >
                        <Space size="large">
                            <BellOutlined style={{ fontSize: "16px", opacity: .5 }} />
                            <QuestionCircleOutlined style={{ fontSize: "16px", opacity: .5 }} />
                            <Dropdown
                                trigger={['click']}
                                menu={{ items }}
                            >
                                <Avatar size={32} icon={<UserOutlined />} />
                            </Dropdown>
                        </Space>

                    </Header>
                    <Content style={{
                        padding: "32px"
                    }}>
                        <Space direction='vertical' size={32}>
                            <Breadcrumb separator="/">
                                {breadcrumbs?.map(({ label, href }, index) => (
                                    <Breadcrumb.Item key={index}>
                                        <Link href={href}>
                                            {label}
                                        </Link>
                                    </Breadcrumb.Item>
                                ))}
                            </Breadcrumb>
                            {children}
                        </Space>
                    </Content>
                </Layout>
            </Layout>
        </>
    )
}