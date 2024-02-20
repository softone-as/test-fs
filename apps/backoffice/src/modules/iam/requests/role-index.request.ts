import { RoleIndexSchema } from 'apps/backoffice/@contracts/iam/role/role-index.contract';
import { createZodDto } from 'nestjs-zod';

export class RoleIndexRequest extends createZodDto(RoleIndexSchema) {}
