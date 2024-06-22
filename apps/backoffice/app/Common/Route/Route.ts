export const route = (
    url: Route,
    propsParams: Record<string, string | number | undefined>,
): string => {
    let newUrl: string = url;
    Object.keys(propsParams).forEach((param) => {
        newUrl = newUrl.replace(`:${param}`, String(propsParams[param]));
    });
    return newUrl;
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
    UserDeleteBatch = '/users/deletes',

    LogActivity = '/logs',
    LogActivityDetail = '/logs/:id',

    Notification = '/notifications',
    NotificationDetail = '/notifications/:id',
    NotificationMarkReadAll = '/notifications/mark-read-all',

    Movies = '/movies',
    MovieDetail = '/movies/:id',
    MovieCreate = '/movies/create',
    MovieEdit = '/movies/edit/:id',
    MovieDelete = '/movies/delete/:id',
    MovieBulkDelete = '/movies/bulk-delete',
    MovieSync = '/movies/sync',
    MovieBulkUpdatePlayUntil = '/movies/bulk-update-play-until',

    Tags = '/tags',
    TagDetail = '/tags/:id',
    TagCreate = '/tags/create',
    TagEdit = '/tags/edit/:id',
    TagDelete = '/tags/delete/:id',
    TagBulkDelete = '/tags/bulk-delete',

    Studios = '/studios',
    StudioDetail = '/studios/:id',
    StudioCreate = '/studios/create',
    StudioEdit = '/studios/edit/:id',
    StudioDelete = '/studios/delete/:id',
    StudioBulkDelete = '/studios/bulk-delete',

    MovieSchedules = '/movie-schedules',
    MovieScheduleDetail = '/movie-schedules/:id',
    MovieScheduleCreate = '/movie-schedules/create',
    MovieScheduleEdit = '/movie-schedules/edit/:id',
    MovieScheduleDelete = '/movie-schedules/delete/:id',
    MovieScheduleBulkDelete = '/movie-schedules/bulk-delete',

    Orders = '/orders',
    OrderDetail = '/orders/:id',
    OrderCreate = '/orders/create',
    OrderEdit = '/orders/edit/:id',
    OrderDelete = '/orders/delete/:id',
    OrderBulkDelete = '/orders/bulk-delete',

    OrderItems = '/order-items',
    OrderItemDetail = '/order-items/:id',
    OrderItemCreate = '/order-items/create',
    OrderItemEdit = '/order-items/edit/:id',
    OrderItemDelete = '/order-items/delete/:id',
    OrderItemBulkDelete = '/order-items/bulk-delete',

    CommonUploadFile = '/commons/upload-file',
    CommonUploadFiles = '/commons/upload-files',

    SampleDetailBasic = '/sample/detail/basic',
    SampleDetailAdvanced = '/sample/detail/advanced',

    SampleFormBasic = '/sample/form/basic',
    SampleFormStep = '/sample/form/step',
    SampleFormAdvanced = '/sample/form/advanced',
}
