import { IsEmail, IsPhoneNumber, IsString } from 'class-validator';

export class ProfileEditRequest {
    @IsString()
    fullname: string;

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @IsPhoneNumber('ID')
    phoneNumber: string;
}
