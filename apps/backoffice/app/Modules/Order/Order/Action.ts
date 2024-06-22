import { Inertia, RequestPayload } from '@inertiajs/inertia';

import { IFormOrder } from './Entities';
import { Route, route } from '../../../Common/Route/Route';

export const createOrder = (payload: IFormOrder | FormData): void => {
    Inertia.post(Route.OrderCreate, payload as unknown as RequestPayload);
};

export const editOrder = (id: number, payload: IFormOrder | FormData): void => {
    Inertia.put(
        route(Route.OrderEdit, { id }),
        payload as unknown as RequestPayload,
    );
};

export const deleteOrder = (id: number): void => {
    Inertia.delete(route(Route.OrderDelete, { id }));
};

export const deleteBulkOrder = (ids: React.Key[]): void => {
    Inertia.post(Route.OrderBulkDelete, {
        ids: ids as string[],
    });
};
