const Dashboard = {
    INDEX: [
        {
            label: 'Dashboard',
            path: '/',
        },
    ],
};

const Permissions = {
    INDEX: [
        {
            label: 'Permission Lists',
            path: '/permissions',
        },
    ],
};

const Roles = {
    INDEX: [
        {
            label: 'Roles Lists',
            path: '/roles',
        },
    ],
};

const LogActivity = {
    INDEX: [
        {
            label: 'Logs',
            path: '/logs',
        },
    ],

    DETAIL: [
        {
            label: 'Logs',
            path: '/logs',
        },
        {
            label: 'Log Detail',
            path: '/logs/detail',
        },
    ],
};

const Users = {
    INDEX: [
        {
            label: 'User Lists',
            path: '/users',
        },
    ],
    DETAIL: [
        {
            label: 'User Lists',
            path: '/users',
        },
        {
            label: 'Detail User',
            path: '/users/detail',
        },
    ],
    CREATE: [
        {
            label: 'User Lists',
            path: '/users',
        },
        {
            label: 'Add New User',
            path: '/users/create',
        },
    ],
    EDIT: [
        {
            label: 'User Lists',
            path: '/users',
        },
        {
            label: 'Edit User',
            path: '/users/edit/:id',
        },
    ],
};

export const Breadcrumbs = {
    Users,
    Dashboard,
    Permissions,
    Roles,
    LogActivity,
};
