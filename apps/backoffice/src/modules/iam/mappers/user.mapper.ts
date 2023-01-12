import { IUser } from 'interface-models/iam/user.interface';
import { UserResponse } from '../responses/user.response';

export class UserMapper {
    public static fromEntity = (
        ...users: IUser[]
    ): UserResponse | UserResponse[] => {
        if (users.length == 1) {
            return {
                id: users[0].id,
                role: users[0].role,
                fullname: users[0].fullname,
                email: users[0].email,
                password: users[0].password,
                identityNumber: users[0].identityNumber,
                phoneNumber: users[0].phoneNumber,
                oneSignalPlayerIds: users[0].oneSignalPlayerIds,
                emailVerifiedAt: users[0].emailVerifiedAt,
                phoneNumberVerifiedAt: users[0].phoneNumberVerifiedAt,
                gender: users[0].gender,
                birthDate: users[0].birthDate,
            };
        } else {
            return users.map(
                (user) => UserMapper.fromEntity(user) as UserResponse,
            );
        }
    };
}
