import { notificationMarkReadSchema } from 'apps/backoffice/@contracts/notification/notification-mark-read.contract';
import { createZodDto } from 'nestjs-zod';

export class InAppNotificationMarkReadRequest extends createZodDto(
    notificationMarkReadSchema,
) {}
