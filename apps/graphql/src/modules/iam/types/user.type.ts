import { Field, Float, InputType, Int, ObjectType } from '@nestjs/graphql';
import { IPaginateResponse, IPaginationMeta } from 'apps/graphql/src/common/interface/index.interface';
import { IndexRequest } from 'apps/graphql/src/common/request/index.request';
import { IsOptional, IsString } from 'class-validator';
import { IRole } from 'interface-models/iam/role.interface';
import { IUserAddress } from 'interface-models/iam/user-addresses.interface';
import { IUser } from 'interface-models/iam/user.interface';
import { Role } from './role.type';
import { UserAddress } from './user-address.type';

@ObjectType()
export class User implements IUser {

    @Field(type => String)
    email: string;

    @Field(type => [UserAddress], { nullable: true })
    userAddresses: IUserAddress[];

    @Field(type => String)
    password: string;

    @Field(type => Float, { nullable: true })
    poin: number;

    @Field(type => Float, { nullable: true })
    lifetimeKg: number;

    @Field(type => String, { nullable: true })
    identityNumber: string;

    @Field(type => String, { nullable: true })
    phoneNumber: string;

    @Field(type => Int)
    id: number;

    @Field({ nullable: true })
    fullname: string;

    @Field(type => Role)
    role: IRole;

    @Field({ nullable: true })
    upadatedAt: Date;

    @Field()
    createdAt: Date;

    @Field({ nullable: true })
    deletedAt: Date;
}

@ObjectType()
export class PaginateMeta implements IPaginationMeta {

    @Field(type => Int)
    page: number;

    @Field(type => Int)
    perPage: number;

    @Field(type => Int)
    total: number;

    @Field(type => Int)
    totalPage: number;

}

@ObjectType()
export class PaginateUser implements IPaginateResponse<User> {

    @Field({ nullable: true })
    meta: PaginateMeta;

    @Field(type => [User])
    data: User[];

}

@InputType()
export class UpdateUserFullname {

    @Field()
    fullname: string;

}

@InputType()
export class UserIndexRequest extends IndexRequest {

    @Field()
    @IsString()
    @IsOptional()
    search?: string;

}
