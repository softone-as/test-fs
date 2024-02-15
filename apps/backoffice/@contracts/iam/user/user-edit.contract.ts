import { IUser } from 'interface-models/iam/user.interface';
import { TCUserCreateProps, UserCreateSchema } from './user-create.contract';

export const UserEditSchema = UserCreateSchema.extend({});

export type TCUserEditProps = TCUserCreateProps & {
    id: number;
    data: Omit<IUser, 'password'>;
    isUpdate: boolean;
};
