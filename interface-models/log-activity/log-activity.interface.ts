import { IBaseEntity } from 'interface-models/base-entity.interface';
import { IUser } from '../iam/user.interface';

export interface ILogActivity extends IBaseEntity {
    id: number;

    user: IUser;

    old_data: any;

    new_data: any;

    activity: string;

    menu: string;

    status: string;

    path: string;
}
