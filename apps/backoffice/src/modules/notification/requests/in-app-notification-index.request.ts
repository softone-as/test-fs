import { notificationIndexSchema } from 'apps/backoffice/@contracts/notification/notification-index.contract';
import { createZodDto } from 'nestjs-zod';

export class InAppNotificationIndexRequest extends createZodDto(
    notificationIndexSchema,
) {}
