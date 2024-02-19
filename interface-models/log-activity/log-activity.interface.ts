import { IUser } from '../iam/user.interface';

export interface ILogActivity {
    id?: number;

    user?: Omit<IUser, 'password'>;

    source: string;

    metaData: any;

    activity: string;

    menu: string;

    path: string;

    createdAt: Date;
}
