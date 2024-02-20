import { PermissionIndexSchema } from 'apps/backoffice/@contracts/iam/permission/permission-index.contract';
import { createZodDto } from 'nestjs-zod';

export class PermissionIndexRequest extends createZodDto(
    PermissionIndexSchema,
) {}
