import { IBaseEntity } from 'interface-models/base-entity.interface';
import { IDistrict } from 'interface-models/region/district.interface';
import { IUser } from './user.interface';

export interface IUserAddress extends IBaseEntity {
    id: number;

    user: IUser;

    mark: string;

    address: string;

    longitude: string;

    latitude: string;

    phoneNumber: string;

    district: IDistrict;

    disrictId?: number;

    userId: number;

    isPrimary: boolean;
}
