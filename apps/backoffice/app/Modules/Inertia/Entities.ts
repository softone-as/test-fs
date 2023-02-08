import { IUser } from 'interface-models/iam/user.interface';

export type TErrorProps = {
    errors: Error | null;
    message: string;
    statusCode: number;
};

export type TMeta = {
    page: number;
    perPage: number;
    total: number;
    totalPage: number;
};

export type TNotificationProps = {
    notificationUnread: number;
};

export type TInertiaProps = {
    error: TErrorProps | null;
    meta: TMeta | null;
    playerId: string | null;
    success: string | null;
    userDetail: IUser | null;
    notifications: TNotificationProps | null;
};

export type TInertiaPages = {
    component: string;
    props: TInertiaProps;
    rememberState: unknown;
    scrollRegions: any[];
    url: string;
    version: string;
};
