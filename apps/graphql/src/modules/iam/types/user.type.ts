import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Role } from './role.type';

@ObjectType()
export class User {
    @Field(type => Int)
    id: number;

    @Field({ nullable: true })
    fullname?: string;

    @Field(type => Role)
    role?: Role;
}