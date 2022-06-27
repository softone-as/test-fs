import { IBaseEntity } from 'interface-models/base-entity.interface';
import { ICity } from 'interface-models/region/city.interface';
import { IRole } from './role.interface';
import { IUserAddress } from './user-addresses.interface';

export enum GenderEnum {
    Perempuan = 'perempuan',
    LakiLaki = 'laki-laki',
}

export interface IUser extends IBaseEntity {
    id: number;

    role: IRole;

    fullname: string;

    email: string;

    password: string;

    poin: number;

    lifetimeKg: number;

    identityNumber: string;

    phoneNumber: string;

    oneSignalPlayerIds?: string[];

    userAddresses: IUserAddress[];

    city?: ICity;

    emailVerifiedAt?: Date;

    phoneNumberVerifiedAt?: Date;

    gender?: GenderEnum;

    birthDate?: Date;
}
