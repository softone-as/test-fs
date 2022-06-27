import {
    FaRecycle,
    FaUserAlt,
    FaHamburger,
    FaWarehouse,
    FaTractor,
    FaInfo,
    FaMoneyBill,
} from 'react-icons/fa';
import { BiCurrentLocation } from 'react-icons/bi';
import { RiMoneyDollarCircleFill, RiShieldUserLine } from 'react-icons/ri';
import { RiArchiveLine } from 'react-icons/ri';

export type RouteType = {
    permissions: string[];
    name: string;
    href: string;
    icon?: any;
};
import {
    PERMISSION_BACKOFFICE_SHOW_WARNING,
    PERMISSION_BACKOFFICE_SHOW_DASHBOARD,
    PERMISSION_BACKOFFICE_SHOW_PRODUCT,
    PERMISSION_BACKOFFICE_SHOW_BASE,
    PERMISSION_BACKOFFICE_SHOW_CONFIG,
    PERMISSION_BACKOFFICE_SHOW_USER,
    PERMISSION_BACKOFFICE_SHOW_PRODUCT_CATEGORY,
    PERMISSION_BACKOFFICE_SHOW_ROLE,
    PERMISSION_BACKOFFICE_SHOW_ROLE_PERMISSION,
    PERMISSION_BACKOFFICE_SHOW_PERMISSION,
    PERMISSION_BACKOFFICE_SHOW_CONTENT,
    PERMISSION_BACKOFFICE_SHOW_DEPOSIT_TRASH,
    PERMISSION_BACKOFFICE_SHOW_POIN_HISTORY,
} from '../modules/Permission/Entity/Permission';

export type RouteListType = RouteType & {
    children?: RouteType[];
};

export const Route = {
    DepositTrash: '/deposit-trashes',
    EditDepositTrash: '/deposit-trashes/edit',

    DepositTrashItem: '/deposit-trash-items',
    ValidateDepositTrashItem: '/deposit-trash-items/validate',

    PoinHistories: '/poin-histories',

    Products: '/products',
    CreateProduct: '/products/create',
    EditProduct: '/products/edit',

    Warnings: '/warnings',
    CreateWarning: '/warnings/create',
    EditWarning: '/warnings/edit',

    Bases: '/bases',
    CreateBase: '/bases/create',
    EditBase: '/bases/edit',

    Contents: '/contents',
    CreateContent: '/contents/create',
    EditContent: '/contents/edit',

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

    ProductCategories: '/product-categories',
    CreateProductCategory: '/product-categories/create',
    EditProductCategory: '/product-categories/edit',

    Users: '/users',
    CreateUser: '/users/create',
    EditUser: '/users/edit',

    Home: '/dashboard/page',
};

export const RouteList: RouteListType[] = [
    {
        permissions: [PERMISSION_BACKOFFICE_SHOW_DASHBOARD],
        name: 'Beranda',
        href: Route.Home,
    },
    {
        permissions: [
            PERMISSION_BACKOFFICE_SHOW_PRODUCT,
            PERMISSION_BACKOFFICE_SHOW_PRODUCT_CATEGORY,
        ],
        name: 'Produk',
        href: '#',
        icon: FaRecycle,
        children: [
            {
                permissions: [PERMISSION_BACKOFFICE_SHOW_PRODUCT_CATEGORY],
                name: 'Category',
                href: Route.ProductCategories,
                icon: BiCurrentLocation,
            },
            {
                permissions: [PERMISSION_BACKOFFICE_SHOW_PRODUCT],
                name: 'Produk',
                href: Route.Products,
                icon: BiCurrentLocation,
            },
        ],
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
    {
        permissions: [PERMISSION_BACKOFFICE_SHOW_CONFIG],
        name: 'Config',
        href: '#',
        icon: FaHamburger,
        children: [
            {
                permissions: [PERMISSION_BACKOFFICE_SHOW_CONFIG],
                name: 'General',
                href: Route.Configs,
                icon: RiArchiveLine,
            },
        ],
    },
    {
        permissions: [PERMISSION_BACKOFFICE_SHOW_POIN_HISTORY],
        name: 'Poin',
        href: '#',
        icon: FaMoneyBill,
        children: [
            {
                permissions: [PERMISSION_BACKOFFICE_SHOW_POIN_HISTORY],
                name: 'History',
                href: Route.PoinHistories,
                icon: RiMoneyDollarCircleFill,
            },
        ],
    },
    {
        permissions: [PERMISSION_BACKOFFICE_SHOW_WARNING],
        name: 'Alert',
        href: '#',
        icon: FaInfo,
        children: [
            {
                permissions: [PERMISSION_BACKOFFICE_SHOW_WARNING],
                name: 'Warning',
                href: Route.Warnings,
                icon: RiArchiveLine,
            },
        ],
    },
    {
        permissions: [PERMISSION_BACKOFFICE_SHOW_BASE],
        name: 'Base',
        href: '#',
        icon: FaWarehouse,
        children: [
            {
                permissions: [PERMISSION_BACKOFFICE_SHOW_BASE],
                name: 'Base',
                href: Route.Bases,
                icon: RiArchiveLine,
            },
        ],
    },
    {
        permissions: [PERMISSION_BACKOFFICE_SHOW_CONTENT],
        name: 'Content',
        href: '#',
        icon: FaWarehouse,
        children: [
            {
                permissions: [PERMISSION_BACKOFFICE_SHOW_CONTENT],
                name: 'Draft Content',
                href: `${Route.Contents}?status=draft`,
                icon: RiArchiveLine,
            },
            {
                permissions: [PERMISSION_BACKOFFICE_SHOW_CONTENT],
                name: 'Publsihed Content',
                href: `${Route.Contents}?status=published`,
                icon: RiArchiveLine,
            },
        ],
    },
    {
        permissions: [PERMISSION_BACKOFFICE_SHOW_DEPOSIT_TRASH],
        name: 'Logistic',
        href: '#',
        icon: FaTractor,
        children: [
            {
                permissions: [PERMISSION_BACKOFFICE_SHOW_DEPOSIT_TRASH],
                name: 'Deposit Trash',
                href: Route.DepositTrash,
                icon: RiArchiveLine,
            },
        ],
    },
];

export const EndpointRoute = {
    AdminLogin: '/auth/login',
    ForgotPassword: '/auth/forgot-password',
    ConfirmForgotPassword: '/auth/confirm-forgot-password',

    OneSignalPlayerId: '/auth/one-signal-player-id',

    Product: '/products',
    CreateProduct: '/products/create',
    DeleteProduct: '/products/delete',
    EditProduct: '/products/edit',

    PoinHistory: '/poin-hitories',

    Warning: '/warnings',
    CreateWarning: '/warnings/create',
    DeleteWarning: '/warnings/delete',
    EditWarning: '/warnings/edit',

    Config: '/configs',
    EditConfig: '/configs/edit',

    ProductCategory: '/product-categories',
    CreateProductCategory: '/product-categories/create',
    DeleteProductCategory: '/product-categories/delete',
    EditProductCategory: '/product-categories/edit',

    EditDepositTrash: '/deposit-trashes/edit',
    DepositTrashItem: '/deposit-trash-items',
    ValidateDepositTrashItem: '/deposit-trash-items/validate',

    Logistic: '/logistics',

    Base: '/bases',
    CreateBase: '/bases/create',
    DeleteBase: '/bases/delete',
    EditBase: '/bases/edit',

    User: '/users',
    CreateUser: '/users/create',
    DeleteUser: '/users/delete',
    EditUser: '/users/edit',

    Permission: '/permissions',
    EditPermission: '/permissions/edit',

    Role: '/roles',
    CreateRole: '/roles/create',
    DeleteRole: '/roles/delete',
    EditRole: '/roles/edit',

    Content: '/contents',
    CreateContent: '/contents/create',
    DeleteContent: '/contents/delete',
    EditContent: '/contents/edit',

    RolePermission: '/role-permissions',
    CreateRolePermission: '/role-permissions/create',
    DeleteRolePermission: '/role-permissions/delete',
    EditRolePermission: '/role-permissions/edit',

    UploadImage: '/commons/upload-file',
    UploadImages: '/commons/upload-files',
    Users: '/users',
};
