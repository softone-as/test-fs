import { IBaseEntity } from 'interface-models/base-entity.interface';
import { IPermission } from './permission.interface';
import { IUser } from './user.interface';

export interface IRole extends IBaseEntity {
    id: number;

    name: string;

    key: string;

    users?: IUser[];

    permissions?: IPermission[];
}
