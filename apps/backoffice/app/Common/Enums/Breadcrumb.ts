import { TBreadcrumbsItem } from '../../Modules/Common/Entities';
import { Route, route } from '../Route/Route';

const Dashboard = {
    INDEX: [
        {
            label: 'Dashboard',
            path: '/',
        },
    ],
};

const Profile = {
    INDEX: [
        {
            label: 'Profile',
            path: '/profile',
        },
    ],

    EDIT: [
        {
            label: 'Profile',
            path: '/profile',
        },
        {
            label: 'Edit Profile',
            path: '/profile/edit/',
        },
    ],

    EDITPASSWORD: [
        {
            label: 'Profile',
            path: '/profile',
        },
        {
            label: 'Edit Password',
            path: '/profile/edit/password',
        },
    ],
};

const Permissions = {
    INDEX: [
        {
            label: 'Permission Lists',
            path: Route.Permissions,
        },
    ],
    DETAIL: [
        {
            label: 'Permission Lists',
            path: Route.Permissions,
        },
        {
            label: 'Permission Detail',
            path: '#',
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
    DETAIL: [
        {
            label: 'Roles List',
            path: Route.Roles,
        },
        {
            label: 'Role Detail',
            path: '#',
        },
    ],
    CREATE: [
        {
            label: 'Roles Lists',
            path: Route.Roles,
        },
        {
            label: 'New Role',
            path: '/roles/create',
        },
    ],
    EDIT: [
        {
            label: 'Roles Lists',
            path: Route.Roles,
        },
        {
            label: 'Edit Role',
            path: '/roles/edit/:id',
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
            path: '#',
        },
    ],
};

const Notification = {
    INDEX: [
        {
            label: 'Notification',
            path: '/notifications',
        },
    ],

    DETAIL: [
        {
            label: 'Notification',
            path: '/notifications',
        },
        {
            label: 'Notification Detail',
            path: '/notifications/detail',
        },
    ],
};

const Movies = {
    INDEX: [
        {
            label: 'Movie',
            path: Route.Movies,
        },
    ],

    DETAIL: (id: number): TBreadcrumbsItem[] => [
        {
            label: 'Movie',
            path: Route.Movies,
        },
        {
            label: 'Detail',
            path: route(Route.MovieDetail, { id }),
        },
    ],
    CREATE: [
        {
            label: 'Movie',
            path: Route.Movies,
        },
        {
            label: 'Create',
            path: Route.MovieCreate,
        },
    ],
    EDIT: (id: number): TBreadcrumbsItem[] => [
        {
            label: 'Movie',
            path: Route.Movies,
        },
        {
            label: 'Edit',
            path: route(Route.MovieEdit, { id }),
        },
    ],
};

const Tags = {
    INDEX: [
        {
            label: 'Tag',
            path: Route.Tags,
        },
    ],

    DETAIL: (id: number): TBreadcrumbsItem[] => [
        {
            label: 'Tag',
            path: Route.Tags,
        },
        {
            label: 'Detail',
            path: route(Route.TagDetail, { id }),
        },
    ],
    CREATE: [
        {
            label: 'Tag',
            path: Route.Tags,
        },
        {
            label: 'Create',
            path: Route.TagCreate,
        },
    ],
    EDIT: (id: number): TBreadcrumbsItem[] => [
        {
            label: 'Tag',
            path: Route.Tags,
        },
        {
            label: 'Edit',
            path: route(Route.TagEdit, { id }),
        },
    ],
};

const Studios = {
    INDEX: [
        {
            label: 'Studio',
            path: Route.Studios,
        },
    ],

    DETAIL: (id: number): TBreadcrumbsItem[] => [
        {
            label: 'Studio',
            path: Route.Studios,
        },
        {
            label: 'Detail',
            path: route(Route.StudioDetail, { id }),
        },
    ],
    CREATE: [
        {
            label: 'Studio',
            path: Route.Studios,
        },
        {
            label: 'Create',
            path: Route.StudioCreate,
        },
    ],
    EDIT: (id: number): TBreadcrumbsItem[] => [
        {
            label: 'Studio',
            path: Route.Studios,
        },
        {
            label: 'Edit',
            path: route(Route.StudioEdit, { id }),
        },
    ],
};

const MovieSchedules = {
    INDEX: [
        {
            label: 'Movie Schedule',
            path: Route.MovieSchedules,
        },
    ],

    DETAIL: (id: number): TBreadcrumbsItem[] => [
        {
            label: 'Movie Schedule',
            path: Route.MovieSchedules,
        },
        {
            label: 'Detail',
            path: route(Route.MovieScheduleDetail, { id }),
        },
    ],
    CREATE: [
        {
            label: 'Movie Schedule',
            path: Route.MovieSchedules,
        },
        {
            label: 'Create',
            path: Route.MovieScheduleCreate,
        },
    ],
    EDIT: (id: number): TBreadcrumbsItem[] => [
        {
            label: 'Movie Schedule',
            path: Route.MovieSchedules,
        },
        {
            label: 'Edit',
            path: route(Route.MovieScheduleEdit, { id }),
        },
    ],
};

const Order = {
    INDEX: [
        {
            label: 'Order',
            path: Route.Orders,
        },
    ],

    DETAIL: (id: number): TBreadcrumbsItem[] => [
        {
            label: 'Order',
            path: Route.Orders,
        },
        {
            label: 'Detail',
            path: route(Route.OrderDetail, { id }),
        },
    ],
    CREATE: [
        {
            label: 'Order',
            path: Route.Orders,
        },
        {
            label: 'Create',
            path: Route.OrderCreate,
        },
    ],
    EDIT: (id: number): TBreadcrumbsItem[] => [
        {
            label: 'Order',
            path: Route.Orders,
        },
        {
            label: 'Edit',
            path: route(Route.OrderEdit, { id }),
        },
    ],
};

const OrderItem = {
    INDEX: [
        {
            label: 'Order Item',
            path: Route.OrderItems,
        },
    ],

    DETAIL: (id: number): TBreadcrumbsItem[] => [
        {
            label: 'Order Item',
            path: Route.OrderItems,
        },
        {
            label: 'Detail',
            path: route(Route.OrderItemDetail, { id }),
        },
    ],
    CREATE: [
        {
            label: 'Order Item',
            path: Route.OrderItems,
        },
        {
            label: 'Create',
            path: Route.OrderItemCreate,
        },
    ],
    EDIT: (id: number): TBreadcrumbsItem[] => [
        {
            label: 'Order Item',
            path: Route.OrderItems,
        },
        {
            label: 'Edit',
            path: route(Route.OrderItemEdit, { id }),
        },
    ],
};

export const Breadcrumbs = {
    Users,
    Profile,
    Dashboard,
    Permissions,
    Roles,
    LogActivity,
    Notification,
    Movies,
    Tags,
    Studios,
    MovieSchedules,
    Order,
    OrderItem,
};
