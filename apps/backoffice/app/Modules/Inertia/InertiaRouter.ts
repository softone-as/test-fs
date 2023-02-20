import { Inertia } from '@inertiajs/inertia';
import { Route } from '../../Enums/Route';

export const router = (url: Route, param?: string) =>
    Inertia.get(`${url}/${param || null}`);
