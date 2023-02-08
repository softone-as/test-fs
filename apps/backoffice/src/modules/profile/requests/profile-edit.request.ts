import {
    IsDate,
    IsEmail,
    IsEnum,
    IsPhoneNumber,
    IsString,
} from 'class-validator';
import { GenderEnum } from 'interface-models/iam/user.interface';

export class ProfileEditRequest {
    @IsString()
    fullname: string;

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @IsPhoneNumber('ID')
    phoneNumber: string;

    @IsString()
    identityNumber: string;

    @IsString()
    @IsEnum(GenderEnum)
    gender: GenderEnum;

    @IsDate()
    @IsEmail()
    birthDate: Date;
}
