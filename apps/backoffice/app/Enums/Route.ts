import { FaUserAlt } from 'react-icons/fa';
import { RiShieldUserLine } from 'react-icons/ri';

export type RouteType = {
    permissions: string[];
    name: string;
    href: string;
    icon?: any;
};
import {
    PERMISSION_BACKOFFICE_SHOW_DASHBOARD,
    PERMISSION_BACKOFFICE_SHOW_USER,
    PERMISSION_BACKOFFICE_SHOW_ROLE,
    PERMISSION_BACKOFFICE_SHOW_ROLE_PERMISSION,
    PERMISSION_BACKOFFICE_SHOW_PERMISSION,
} from '../../../../constants/permission.constant';

export type RouteListType = RouteType & {
    children?: RouteType[];
};

export const Route = {
    Profile: '/profile',
    EditProfile: '/profile/edit',
    EditProfilePassword: '/profile/edit/password',

    Products: '/products',
    CreateProduct: '/products/create',
    EditProduct: '/products/edit',

    Configs: '/configs',
    EditConfig: '/configs/edit',

    Roles: '/roles',
    CreateRole: '/roles/create',
    EditRole: '/roles/edit',

    RolePermissions: '/role-permissions',
    CreateRolePermission: '/role-permissions/create',
    EditRolePermission: '/role-permissions/edit',

    Permissions: '/permissions',
    EditPermission: '/permissions/edit',

    Users: '/users',
    CreateUser: '/users/create',
    EditUser: '/users/edit',

    LogActivity: '/logs',

    Home: '/dashboard/page',
    Dashboard: '/',
    Logout: '/auth/logout',

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

export const EndpointRoute = {
    Profile: '/profile',
    EditProfile: '/profile/edit',
    EditProfilePassword: '/profile/edit/password',

    AdminLogin: '/auth/login',
    ForgotPassword: '/auth/forgot-password',
    ConfirmForgotPassword: '/auth/confirm-forgot-password',

    OneSignalPlayerId: '/auth/one-signal-player-id',

    Product: '/products',
    CreateProduct: '/products/create',
    DeleteProduct: '/products/delete',
    EditProduct: '/products/edit',

    Config: '/configs',
    EditConfig: '/configs/edit',

    ProductCategory: '/product-categories',
    CreateProductCategory: '/product-categories/create',
    DeleteProductCategory: '/product-categories/delete',
    EditProductCategory: '/product-categories/edit',

    User: '/users',
    CreateUser: '/users/create',
    DeleteUser: '/users/deletes',
    EditUser: '/users/edit',

    Permission: '/permissions',
    EditPermission: '/permissions/edit',

    Role: '/roles',
    CreateRole: '/roles/create',
    DeleteRole: '/roles/delete',
    EditRole: '/roles/edit',

    RolePermission: '/role-permissions',
    CreateRolePermission: '/role-permissions/create',
    DeleteRolePermission: '/role-permissions/delete',
    EditRolePermission: '/role-permissions/edit',

    UploadImage: '/commons/upload-file',
    UploadImages: '/commons/upload-files',
    Users: '/users',
};
