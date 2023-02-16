import { Inertia } from '@inertiajs/inertia';
import { EndpointRoute } from '../../Enums/Route';

export const markReadAllNotification = (): void => {
    Inertia.patch(EndpointRoute.NotificationMarkReadAll);
};
