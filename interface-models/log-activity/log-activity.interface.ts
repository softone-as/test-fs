import { IBaseEntity } from 'interface-models/base-entity.interface';
import { IUser } from '../iam/user.interface';

export interface ILogActivity extends IBaseEntity {
    id: number;

    user: IUser;

    functionName: string;

    method: string;

    data: any;

    description: string;

    menu: string;

    status: string;

    path: string;
}
