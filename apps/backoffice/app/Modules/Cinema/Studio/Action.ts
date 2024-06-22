import { Inertia } from '@inertiajs/inertia';
import { route, Route } from '../../../Common/Route/Route';
import { IFormStudio } from './Entities';

export const createStudio = (payload: IFormStudio): void => {
    Inertia.post(Route.StudioCreate, payload);
};

export const editStudio = (id: number, payload: IFormStudio): void => {
    Inertia.put(route(Route.StudioEdit, { id }), payload);
};

export const deleteStudio = (id: number): void => {
    Inertia.delete(route(Route.StudioDelete, { id }));
};

export const deleteBulkStudio = (ids: React.Key[]): void => {
    Inertia.post(Route.StudioBulkDelete, {
        ids: ids as string[],
    });
};
