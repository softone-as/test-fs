import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumberString, IsString, Matches } from 'class-validator';

@InputType()
export class AuthLoginRequest {

    @Field()
    @IsNotEmpty()
    @IsNumberString()
    phoneNumber: string;

    @Field()
    @IsNotEmpty()
    @IsString()
    password: string;

}

@ObjectType()
export class AuthUserResponse {

    @Field(type => Int)
    id: number;

    @Field(type => String)
    fullname: string;

    @Field(type => String)
    email: string;

    @Field(type => String)
    phoneNumber: string;
}

@ObjectType()
export class AuthLoginResponse {

    @Field(type => AuthUserResponse)
    user: AuthUserResponse;

    @Field(type => String)
    token: string;
}