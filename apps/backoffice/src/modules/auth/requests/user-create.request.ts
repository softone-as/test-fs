import { createZodDto } from 'nestjs-zod';
import { UserCreateSchema } from '../../../../@contracts/iam/create-user.schema';

export class UserCreateRequest extends createZodDto(UserCreateSchema) {}
