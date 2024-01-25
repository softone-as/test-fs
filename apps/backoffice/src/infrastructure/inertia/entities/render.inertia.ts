export interface IRenderInertia {
    component: string;
    props?: any;
}

export interface IRenderInertiaNew<T extends Record<string, any>> {
    component: string;
    props: T;
}
