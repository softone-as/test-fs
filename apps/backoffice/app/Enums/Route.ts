import { FaUserAlt } from 'react-icons/fa';
import { RiShieldUserLine } from 'react-icons/ri';
import {
    PERMISSION_BACKOFFICE_SHOW_DASHBOARD,
    PERMISSION_BACKOFFICE_SHOW_USER,
    PERMISSION_BACKOFFICE_SHOW_ROLE,
    PERMISSION_BACKOFFICE_SHOW_ROLE_PERMISSION,
    PERMISSION_BACKOFFICE_SHOW_PERMISSION,
} from '../../../../constants/permission.constant';

export type RouteType = {
    permissions: string[];
    name: string;
    href: string;
    icon?: any;
};

export type RouteListType = RouteType & {
    children?: RouteType[];
};

export const Route = {
    Profile: '/profile',
    ProfileEdit: '/profile/edit',
    ProfileEditPassword: '/profile/edit/password',

    AuthLogin: '/auth/login',
    AuthLogout: '/auth/logout',
    AuthForgotPassword: '/auth/forgot-password',
    AuthConfirmForgotPassword: '/auth/confirm-forgot-password',

    AuthOneSignalPlayerId: '/auth/one-signal-player-id',

    Configs: '/configs',
    ConfigEdit: '/configs/edit',

    Roles: '/roles',
    RoleCreate: '/roles/create',
    RoleEdit: '/roles/edit',
    RoleDelete: '/roles/delete',

    RolePermissions: '/role-permissions',
    RolePermissionCreate: '/role-permissions/create',
    RolePermissionEdit: '/role-permissions/edit',
    RolePermissionDelete: '/role-permissions/delete',

    Permissions: '/permissions',
    PermissionEdit: '/permissions/edit',

    Users: '/users',
    UserCreate: '/users/create',
    UserEdit: '/users/edit',
    UserDelete: '/users/delete',

    LogActivity: '/logs',

    Notification: '/notifications',
    NotificationMarkReadAll: '/notifications/mark-read-all',

    Home: '/dashboard/page',
    Dashboard: '/',

    CommonUploadFile: '/commons/upload-file',
    CommonUploadFiles: '/commons/upload-files',

    SampleDetailBasic: '/sample/detail/basic',
    SampleDetailAdvanced: '/sample/detail/advanced',

    SampleFormBasic: '/sample/form/basic',
    SampleFormStep: '/sample/form/step',
    SampleFormAdvanced: '/sample/form/advanced',
};

export const RouteList: RouteListType[] = [
    {
        permissions: [PERMISSION_BACKOFFICE_SHOW_DASHBOARD],
        name: 'Beranda',
        href: Route.Home,
    },
    {
        permissions: [
            PERMISSION_BACKOFFICE_SHOW_USER,
            PERMISSION_BACKOFFICE_SHOW_ROLE,
            PERMISSION_BACKOFFICE_SHOW_ROLE_PERMISSION,
            PERMISSION_BACKOFFICE_SHOW_PERMISSION,
        ],
        name: 'IAM',
        href: '#',
        icon: FaUserAlt,
        children: [
            {
                permissions: [PERMISSION_BACKOFFICE_SHOW_USER],
                name: 'User',
                href: Route.Users,
                icon: RiShieldUserLine,
            },
            {
                permissions: [PERMISSION_BACKOFFICE_SHOW_ROLE],
                name: 'Role',
                href: Route.Roles,
                icon: RiShieldUserLine,
            },
            {
                permissions: [PERMISSION_BACKOFFICE_SHOW_PERMISSION],
                name: 'Permission',
                href: Route.Permissions,
                icon: RiShieldUserLine,
            },
            {
                permissions: [PERMISSION_BACKOFFICE_SHOW_ROLE_PERMISSION],
                name: 'Role Permission',
                href: Route.RolePermissions,
                icon: RiShieldUserLine,
            },
        ],
    },
];
