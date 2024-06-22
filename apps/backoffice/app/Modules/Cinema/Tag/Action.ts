import { Inertia } from '@inertiajs/inertia';
import { route, Route } from '../../../Common/Route/Route';
import { IFormTag } from './Entities';

export const createTag = (payload: IFormTag): void => {
    Inertia.post(Route.TagCreate, payload);
};

export const editTag = (id: number, payload: IFormTag): void => {
    Inertia.put(route(Route.TagEdit, { id }), payload);
};

export const deleteTag = (id: number): void => {
    Inertia.delete(route(Route.TagDelete, { id }));
};

export const deleteBulkTag = (ids: React.Key[]): void => {
    Inertia.post(Route.TagBulkDelete, {
        ids: ids as string[],
    });
};
