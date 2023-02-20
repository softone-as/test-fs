import { Inertia } from '@inertiajs/inertia';
import { Route } from '../../Enums/Route';

export const markReadAllNotification = (): void => {
    Inertia.patch(Route.NotificationMarkReadAll);
};
