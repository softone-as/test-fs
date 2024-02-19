import { LogActivityCreateSchema } from 'apps/backoffice/@contracts/log-activity/log-activity-create.contract';
import { createZodDto } from 'nestjs-zod';

export class LogActivityCreateRequest extends createZodDto(
    LogActivityCreateSchema,
) {}
