import { IUser } from 'interface-models/iam/user.interface';
import { TCUserCreateProps } from './user-create.contract';

export type TCUserEditProps = TCUserCreateProps & {
    id: number;
    data: Omit<IUser, 'password'>;
    isUpdate: boolean;
};
