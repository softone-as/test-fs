import { GenderEnum } from 'apps/backoffice/app/Common/Enums/Gender.enum';
import { IPaginateResponse } from 'apps/backoffice/src/common/interface/index.interface';
import { IndexRequestSchema } from 'apps/backoffice/src/common/request/index.request';
import { IUser } from 'interface-models/iam/user.interface';
import { z } from 'zod';

export const UserIndexSchema = IndexRequestSchema.extend({
    gender: z.nativeEnum(GenderEnum).optional(),
    createdAt: z.string().optional(),
});

export type TUserIndexSchema = z.infer<typeof UserIndexSchema>;

export type TCUserIndexProps = IPaginateResponse<Omit<IUser, 'password'>>;
