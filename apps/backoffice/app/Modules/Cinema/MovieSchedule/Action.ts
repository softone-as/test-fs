import { Inertia } from '@inertiajs/inertia';
import { route, Route } from '../../../Common/Route/Route';
import { IFormMovieSchedule } from './Entities';

export const createMovieSchedule = (payload: IFormMovieSchedule): void => {
    Inertia.post(Route.MovieScheduleCreate, payload);
};

export const editMovieSchedule = (
    id: number,
    payload: IFormMovieSchedule,
): void => {
    Inertia.put(route(Route.MovieScheduleEdit, { id }), payload);
};

export const deleteMovieSchedule = (id: number): void => {
    Inertia.delete(route(Route.MovieScheduleDelete, { id }));
};

export const deleteBulkMovieSchedule = (ids: React.Key[]): void => {
    Inertia.post(Route.MovieScheduleBulkDelete, {
        ids: ids as string[],
    });
};
