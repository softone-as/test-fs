import { UserEditSchema } from 'apps/backoffice/@contracts/iam/user/user-edit.contract';

import { createZodDto } from 'nestjs-zod';

export class UserUpdateRequest extends createZodDto(UserEditSchema) {}
