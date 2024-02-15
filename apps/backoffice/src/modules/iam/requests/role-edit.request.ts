import { RoleCreateSchema } from 'apps/backoffice/@contracts/iam/role/role-create.contract';
import { createZodDto } from 'nestjs-zod';

//TODO TODO: pick type from create role contract
export class RoleEditRequest extends createZodDto(RoleCreateSchema) {}
