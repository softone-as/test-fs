import { UserCreateSchema } from 'apps/backoffice/@contracts/iam/user/user-create.contract';
import { createZodDto } from 'nestjs-zod';

export class UserCreateRequest extends createZodDto(UserCreateSchema) {}
