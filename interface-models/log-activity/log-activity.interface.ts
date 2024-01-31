import { IUser } from '../iam/user.interface';

export interface ILogActivity {
    id: number;

    user: IUser | null;

    source: string;

    metaData: any;

    activity: string;

    menu: string;

    path: string;

    createdAt?: Date;
}
