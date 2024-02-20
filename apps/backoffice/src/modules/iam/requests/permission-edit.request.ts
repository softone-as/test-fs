import { PermissionsEditSchema } from 'apps/backoffice/@contracts/iam/permission/permission-edit.contract';
import { createZodDto } from 'nestjs-zod';

export class PermissionEditRequest extends createZodDto(
    PermissionsEditSchema,
) {}
