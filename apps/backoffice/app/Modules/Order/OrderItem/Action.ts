import { Inertia } from '@inertiajs/inertia';
import { IFormOrderItem } from './Entities';
import { Route, route } from '../../../Common/Route/Route';

export const createOrderItem = (payload: IFormOrderItem | FormData): void => {
    Inertia.post(Route.OrderItemCreate, payload);
};

export const editOrderItem = (
    id: number,
    payload: IFormOrderItem | FormData,
): void => {
    Inertia.put(route(Route.OrderItemEdit, { id }), payload);
};

export const deleteOrderItem = (id: number): void => {
    Inertia.delete(route(Route.OrderItemDelete, { id }));
};

export const deleteBulkOrderItem = (ids: React.Key[]): void => {
    Inertia.post(Route.OrderItemBulkDelete, {
        ids: ids as string[],
    });
};
