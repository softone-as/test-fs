import { TCUserDetailProps } from 'apps/backoffice/@contracts/iam/user/user-detail.contract';
import { IUser } from 'interface-models/iam/user.interface';

export class UserResponse {
    public static fromEntity = (user: IUser): TCUserDetailProps['data'] => ({
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
