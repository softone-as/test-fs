import { IUser } from 'interface-models/iam/user.interface';

export type TCUserDetailProps = {
    data: Omit<IUser, 'password'>;
};
