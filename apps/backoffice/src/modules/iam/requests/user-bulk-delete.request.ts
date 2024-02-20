import { UserBulkDeleteSchema } from 'apps/backoffice/@contracts/iam/user/user-delete.contract';
import { createZodDto } from 'nestjs-zod';

export class UserBulkDeleteRequest extends createZodDto(UserBulkDeleteSchema) {}
