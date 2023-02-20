export type RouteType = {
    permissions: string[];
    name: string;
    href: string;
    icon?: any;
};

export type RouteListType = RouteType & {
    children?: RouteType[];
};

export enum Route {
    Dashboard = '/',

    Profile = '/profile',
    ProfileEdit = '/profile/edit',
    ProfileEditPassword = '/profile/edit/password',

    AuthLogin = '/auth/login',
    AuthLogout = '/auth/logout',
    AuthForgotPassword = '/auth/forgot-password',
    AuthConfirmForgotPassword = '/auth/confirm-forgot-password',

    Configs = '/configs',
    ConfigEdit = '/configs/edit/:id',

    Roles = '/roles',
    RoleDetail = '/roles/:id',
    RoleCreate = '/roles/create',
    RoleEdit = '/roles/edit/:id',
    RoleDelete = '/roles/delete/:id',

    RolePermissions = '/role-permissions',
    RolePermissionDetail = '/role-permissions/:id',
    RolePermissionCreate = '/role-permissions/create',
    RolePermissionEdit = '/role-permissions/edit/:id',
    RolePermissionDelete = '/role-permissions/delete/:id',

    Permissions = '/permissions',
    PermissionDetail = '/permissions/:id',

    Users = '/users',
    UserDetail = '/users/:id',
    UserCreate = '/users/create',
    UserEdit = '/users/edit/:id',
    UserDelete = '/users/delete/:id',

    LogActivity = '/logs',
    LogActivityDetail = '/logs/:id',

    Notification = '/notifications',
    NotificationDetail = '/notifications/:id',
    NotificationMarkReadAll = '/notifications/mark-read-all',

    CommonUploadFile = '/commons/upload-file',
    CommonUploadFiles = '/commons/upload-files',

    SampleDetailBasic = '/sample/detail/basic',
    SampleDetailAdvanced = '/sample/detail/advanced',

    SampleFormBasic = '/sample/form/basic',
    SampleFormStep = '/sample/form/step',
    SampleFormAdvanced = '/sample/form/advanced',
}
