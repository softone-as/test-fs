import { UserIndexSchema } from 'apps/backoffice/@contracts/iam/user/user-index.contract';
import { createZodDto } from 'nestjs-zod';

export class UserIndexRequest extends createZodDto(UserIndexSchema) {}
