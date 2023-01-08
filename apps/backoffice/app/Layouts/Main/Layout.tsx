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
} from "antd";
import type { MenuProps } from 'antd'


import { Link } from '../../Components/atoms/Link';
import {
    UserOutlined,
    CaretDownOutlined,
} from "@ant-design/icons";

type BreadcrumbItem = {
    label: string;
    href: string;
};
export type IProps = {
    title: string,
    children: React.ReactNode
    breadcrumbs: BreadcrumbItem[]
}

//Dummy Data
const breadcrumbList: BreadcrumbItem[] = [{ label: 'Dashboard', href: '/dashboard' }]

const items: MenuProps['items'] = [
    {
        key: '1',
        label: 'Logout',
        onClick: () => {
            const isOk = confirm(
                "Are you sure to logout?"
            );
            if (isOk) {
                window.location.host !== process.env.STORY_HOST ? Inertia.post('/logout') : alert('Logging out')
            }
        },

    }
]



const { Sider, Header, Content } = Layout
const { Text } = Typography

export const Main: React.FC<IProps> = ({ title = "Hello World", breadcrumbs = breadcrumbList, children }: IProps) => {

    return (
        <>
            {window.location.host !== process.env.STORY_HOST ? <Head title={title} /> : null}
            <Layout>
                <Sider>

                </Sider>
                <Layout>
                    <Header style={{
                        padding: 0,
                        paddingLeft: "1.5rem",
                        height: "70px",
                        background: "#ffffff",
                        borderBottom: "1px solid #E7E8F2",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        lineHeight: "inherit",
                        position: "sticky",
                        top: 0,
                        zIndex: 10,
                    }}>
                        <Space direction="vertical" size={0}>
                            <Text
                                style={{
                                    fontWeight: "600",
                                    fontSize: "24px",
                                    color: "#1890FF",
                                }}
                            >
                                {title}
                            </Text>

                            <Breadcrumb separator="/">
                                {breadcrumbs?.map(({ label, href }, index) => (
                                    <Breadcrumb.Item key={index}>
                                        <Link href={href}>
                                            {label}
                                        </Link>
                                    </Breadcrumb.Item>
                                ))}
                            </Breadcrumb>
                        </Space>
                        <Dropdown
                            menu={{ items }}
                        >
                            <Space
                                style={{
                                    borderLeft: "1px solid #E7E8F2",
                                    height: "100%",
                                    padding: "0 1rem",
                                    cursor: "pointer",
                                }}
                                size={0}
                            >
                                <Avatar size={50} icon={<UserOutlined />} />
                                <Space
                                    className="profile-navigation__identity"
                                    direction="vertical"
                                    size={0}
                                >
                                    {/* <Text>{userInfo?.name || "N/A"}</Text> */}
                                    <Text>N/A</Text>
                                    <Text
                                        type="secondary"
                                        style={{
                                            fontSize: "12px",
                                            marginTop: "-4px",
                                        }}
                                    >
                                        N/A
                                    </Text>
                                </Space>
                                <CaretDownOutlined
                                    className="profile-navigation__icon"
                                    style={{ color: "#A7A9C0" }}
                                />
                            </Space>
                        </Dropdown>

                    </Header>
                    <Content>{children}</Content>
                </Layout>
            </Layout>
        </>
    )
}