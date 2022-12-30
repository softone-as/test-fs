import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Permission {
    @Field(type => Int)
    id: number;

    @Field({ nullable: true })
    name?: string;

    @Field({ nullable: true })
    key?: string;
}