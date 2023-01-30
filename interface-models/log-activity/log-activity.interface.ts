import { IUser } from '../iam/user.interface';

export interface ILogActivity {
    id: number;

    user: IUser;

    source: string;

    meta_data: any;

    activity: string;

    menu: string;

    path: string;
}
