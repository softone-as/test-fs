import { Inertia } from '@inertiajs/inertia';
import { route, Route } from '../../../Common/Route/Route';
import { IMovieBulkUpdatePlayUntil, IFormMovie } from './Entities';

export const createMovie = (payload: IFormMovie | FormData): void => {
    Inertia.post(Route.MovieCreate, payload);
};

export const sync = (): void => {
    Inertia.post(Route.MovieSync, {});
};

export const editMovie = (id: number, payload: IFormMovie | FormData): void => {
    Inertia.put(route(Route.MovieEdit, { id }), payload);
};

export const deleteMovie = (id: number): void => {
    Inertia.delete(route(Route.MovieDelete, { id }));
};

export const deleteBulkMovie = (ids: React.Key[]): void => {
    Inertia.post(Route.MovieBulkDelete, {
        ids: ids as string[],
    });
};

export const bulkUpdatePlayUntil = (
    payload: IMovieBulkUpdatePlayUntil,
): void => {
    Inertia.post(Route.MovieBulkUpdatePlayUntil, payload);
};
