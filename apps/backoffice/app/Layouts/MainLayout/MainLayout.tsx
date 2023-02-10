import React, { useMemo, useContext } from 'react';
import {
    Layout,
    Typography,
    Space,
    Menu,
    ConfigProvider,
    Avatar,
    Badge,
    Tooltip,
} from 'antd';
import type { MenuProps } from 'antd';
import { Link, usePage } from '@inertiajs/inertia-react';
import {
    BarsOutlined,
    BellOutlined,
    DashboardOutlined,
    HistoryOutlined,
    LogoutOutlined,
    ProfileOutlined,
    SettingOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Inertia, Page } from '@inertiajs/inertia';
import { sidebarThemeConfig } from '../../Utils/theme';
import { PageProgress } from '../../Components/molecules/Progress';
import Breadcrumbs from '../../Components/molecules/Breadcrumbs/Breadcrumbs';
import { BreadcrumbsItem } from '../../Modules/Common/Entities';
import { TInertiaProps } from '../../Modules/Inertia/Entities';
import { AppContext } from '../../Contexts/App';
import { Route } from '../../Enums/Route';
import { isMobileScreen } from '../../Utils/utils';

export type IProps = {
    children: React.ReactNode;
    headerRightMenu?: React.FC;
    breadcrumbItems?: BreadcrumbsItem[];
};

const handleLogout = (
    event:
        | React.MouseEvent<HTMLAnchorElement, MouseEvent>
        | React.KeyboardEvent<HTMLAnchorElement>,
) => {
    event.preventDefault();
    const isOk = confirm('Are you sure to logout? ');

    if (isOk) {
        Inertia.get('/auth/logout');
    }
};

type MenuItem = Required<MenuProps>['items'][number];

const menuItems: MenuItem[] = [
    {
        key: Route.Dashboard,
        label: <Link href={Route.Dashboard}>Dashboard</Link>,
        icon: <DashboardOutlined />,
    },
    {
        key: '#IAM',
        label: 'IAM',
        icon: <ProfileOutlined />,
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
            },
        ],
    },
    {
        key: '#Sample-Form',
        label: 'Sample Form',
        icon: <BarsOutlined />,
        theme: 'light',
        children: [
            {
                key: Route.SampleFormBasic,
                label: <Link href={Route.SampleFormBasic}>Form Basic</Link>,
            },
            {
                key: Route.SampleFormStep,
                label: <Link href={Route.SampleFormStep}>Form Step</Link>,
            },
            {
                key: Route.SampleFormAdvanced,
                label: (
                    <Link href={Route.SampleFormAdvanced}>Form Advanced</Link>
                ),
            },
        ],
    },
    {
        key: '#Sample-Detail',
        label: 'Sample Detail',
        icon: <BarsOutlined />,
        theme: 'light',
        children: [
            {
                key: Route.SampleDetailBasic,
                label: <Link href={Route.SampleDetailBasic}>Detail Basic</Link>,
            },
            {
                key: Route.SampleDetailAdvanced,
                label: (
                    <Link href={Route.SampleDetailAdvanced}>
                        Detail Advanced
                    </Link>
                ),
            },
        ],
    },
    {
        key: '#Log-Activity',
        label: <Link href="/logs">Log Activity</Link>,
        icon: <HistoryOutlined />,
    },
    {
        key: '#Config',
        label: <Link href="#">Configuration</Link>,
        icon: <SettingOutlined />,
    },
];

const { Sider, Content } = Layout;
const { Text } = Typography;

export const MainLayout: React.FC<IProps> = ({
    children,
    breadcrumbItems = [],
}: IProps) => {
    const { appState } = useContext(AppContext);
    const { props: pageProps } = usePage<Page<TInertiaProps>>();
    const isMobile = isMobileScreen();

    // active menu item key
    const activeMenuKey = useMemo(
        () => window.location.pathname,
        [window.location.pathname],
    );

    // key of parent's active menu item
    const defaultOpenedKey = useMemo(
        () =>
            menuItems.find((item) => {
                if ('children' in item) {
                    const openedMenuItem = item.children?.find((chil) => {
                        return chil.key === activeMenuKey;
                    });
                    return openedMenuItem !== undefined;
                }
            })?.key as string,
        [menuItems, activeMenuKey],
    );

    return (
        // Fix height, so the scroll will be belongs to Content only
        <Layout style={{ height: '100vh' }}>
            {appState.isNavigating && <PageProgress />}
            <Sider
                theme="light"
                style={{
                    backgroundColor: '#006D75',
                    height: '100vh',
                    marginTop: isMobile ? '-60px' : 0,
                }}
                width="222px"
                breakpoint="lg"
                collapsedWidth="0"
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
                    }}
                >
                    <div
                        style={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '64px',
                            borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
                            padding: '0rem 1rem',
                        }}
                    >
                        {/* Apps Logo or Title */}
                        <img src="/img/company-logo.svg" width="80px" />
                    </div>

                    {pageProps.userDetail && (
                        <div
                            style={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                height: '58px',
                                padding: '8px 16px',
                                marginBottom: '14px',
                            }}
                        >
                            {/* User Icon */}
                            <Link href={Route.Profile}>
                                <Space size="small">
                                    <Avatar
                                        size="default"
                                        icon={<UserOutlined />}
                                    />

                                    <Space.Compact
                                        direction="vertical"
                                        size="small"
                                    >
                                        {/* Username */}
                                        <Text
                                            style={{
                                                fontWeight: '500',
                                                fontSize: '14px',
                                                color: '#ffffff',
                                            }}
                                        >
                                            {pageProps.userDetail?.fullname}
                                        </Text>

                                        {/* User Roles */}
                                        <Text
                                            style={{
                                                fontSize: '12px',
                                                color: '#B5F5EC',
                                            }}
                                        >
                                            {pageProps.userDetail.roles
                                                ?.map((r) => r.name)
                                                .join(', ')}
                                        </Text>
                                    </Space.Compact>
                                </Space>
                            </Link>

                            {/* Notification Icon */}
                            <Tooltip title="Notifications" placement="right">
                                <Link href="/notifications">
                                    <Badge
                                        dot={
                                            pageProps.notifications
                                                ?.notificationUnread > 0
                                        }
                                    >
                                        <BellOutlined
                                            style={{
                                                color: 'white',
                                                fontSize: '24px',
                                            }}
                                        />
                                    </Badge>
                                </Link>
                            </Tooltip>
                        </div>
                    )}

                    <ConfigProvider theme={sidebarThemeConfig}>
                        <div
                            style={{
                                flex: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Menu
                                items={menuItems}
                                theme="light"
                                style={{ backgroundColor: '#006D75' }}
                                mode="inline"
                                defaultOpenKeys={[defaultOpenedKey]}
                                selectedKeys={[activeMenuKey]}
                            />

                            {/* Bottom Menu */}
                            <Menu
                                theme="light"
                                style={{ backgroundColor: '#006D75' }}
                                mode="inline"
                            >
                                <Menu.Divider />
                                {/* Logout Button */}
                                <Menu.Item
                                    key="logout"
                                    icon={<LogoutOutlined />}
                                >
                                    <Link href="#" onClick={handleLogout}>
                                        Logout
                                    </Link>
                                </Menu.Item>
                            </Menu>
                        </div>
                    </ConfigProvider>
                </div>
            </Sider>
            <Layout>
                <Content
                    style={{
                        padding: '28px 24px',
                        overflow: 'auto',
                        marginTop: isMobile ? '25px' : 0,
                    }}
                >
                    <Breadcrumbs breadcrumb={breadcrumbItems} />

                    {children}
                </Content>
            </Layout>
        </Layout>
    );
};
