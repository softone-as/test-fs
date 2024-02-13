import { IUser } from 'interface-models/iam/user.interface';

export type TUserResponse = Omit<IUser, 'password'>;
