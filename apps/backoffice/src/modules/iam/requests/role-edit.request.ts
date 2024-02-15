import { RoleEditSchema } from 'apps/backoffice/@contracts/iam/role/role-edit.contract';
import { createZodDto } from 'nestjs-zod';

export class RoleEditRequest extends createZodDto(RoleEditSchema) {}
