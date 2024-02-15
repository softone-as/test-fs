import { RoleCreateSchema } from 'apps/backoffice/@contracts/iam/role/role-create.contract';
import { createZodDto } from 'nestjs-zod';

export class RoleCreateRequest extends createZodDto(RoleCreateSchema) {}
