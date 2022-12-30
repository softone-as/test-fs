import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Permission } from './permission.type';

@ObjectType()
export class Role {
    @Field(type => Int)
    id: number;

    @Field({ nullable: true })
    name?: string;

    @Field({ nullable: true })
    key?: string;

    @Field(type => [Permission])
    permissions?: Permission[];
}