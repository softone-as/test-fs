import { IUser } from 'interface-models/iam/user.interface';
import { TUserResponse } from '../../../../@contracts/iam/user/user.response.contract';

export class UserResponse {
    public static fromEntity = (user: IUser): TUserResponse => ({
        id: user.id,
        fullname: user.fullname,
        email: user.email,
        identityNumber: user.identityNumber,
        phoneNumber: user.phoneNumber,
        oneSignalPlayerIds: user.oneSignalPlayerIds,
        emailVerifiedAt: user.emailVerifiedAt,
        phoneNumberVerifiedAt: user.phoneNumberVerifiedAt,
        gender: user.gender,
        birthDate: user.birthDate,
        roles: user.roles,
        createdAt: user.createdAt,
    });
}
