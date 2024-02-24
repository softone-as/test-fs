import { IPaginateResponse } from 'apps/backoffice/src/common/interface/index.interface';
import { IndexRequestSchema } from 'apps/backoffice/src/common/request/index.request';
import { IInAppNotification } from 'interface-models/notification/in-app-notification.interface';
import { z } from 'zod';

export const notificationIndexSchema = IndexRequestSchema.extend({
    isRead: z.boolean().optional(),
});

export type TNotificationIndexSchema = z.infer<typeof notificationIndexSchema>;

export type TCNotificationIndexProps = IPaginateResponse<IInAppNotification>;
