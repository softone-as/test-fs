import { Inertia } from '@inertiajs/inertia';
import { EndpointRoute } from '../../Enums/Route';

export const markReadAllNotification = (notificationIds: number[]): void => {
    Inertia.patch(EndpointRoute.NotificationMarkReadAll, {
        notificationIds,
    });
};
