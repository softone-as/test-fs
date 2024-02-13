import { TInertiaProps } from '../Inertia/Entities';

export type TBreadcrumbsItem = {
    label: string;
    path: string;
};

export type TInertiaPage<T = Record<string, unknown>> = React.FC<
    T & TInertiaProps
>;
