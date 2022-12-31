import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IUserAddress } from 'interface-models/iam/user-addresses.interface';
import { IUser } from 'interface-models/iam/user.interface';
import { IDistrict } from 'interface-models/region/district.interface';

@ObjectType()
export class UserAddress implements IUserAddress {

    @Field(type => Int)
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
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;

}
