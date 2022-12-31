import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { IPaginateResponse, IPaginationMeta } from 'apps/graphql/src/common/interface/index.interface';
import { IndexRequest } from 'apps/graphql/src/common/request/index.request';
import { IsOptional, IsString } from 'class-validator';
import { Role } from './role.type';

@ObjectType()
export class User {
    @Field(type => Int)
    @Field(type => Int)

    id: number;

    @Field({ nullable: true })
    fullname?: string;

    @Field(type => Role)
    role?: Role;
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
