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

export type TInertiaProps = {
    error: TErrorProps | null;
    meta: TMeta | null;
    playerId: string | null;
    success: string | null;
    userDetail: string | null;
};

export type TInertiaPages = {
    component: string;
    props: TInertiaProps;
    rememberState: unknown;
    scrollRegions: any[];
    url: string;
    version: string;
};
