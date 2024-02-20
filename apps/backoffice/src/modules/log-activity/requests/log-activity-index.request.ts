import { LogActivityIndexSchema } from 'apps/backoffice/@contracts/log-activity/log-activity-index.contract';
import { createZodDto } from 'nestjs-zod';

export class LogActivityIndexRequest extends createZodDto(
    LogActivityIndexSchema,
) {}
