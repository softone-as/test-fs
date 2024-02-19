import { TCAuthLoginProps } from 'apps/backoffice/@contracts/auth/auth-login.contract';
import { IUser } from 'interface-models/iam/user.interface';

export class UserLoginResponse {
    public static fromEntity = (user: IUser): TCAuthLoginProps['data'] => ({
        id: user.id,
        fullname: user.fullname,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    });
}
