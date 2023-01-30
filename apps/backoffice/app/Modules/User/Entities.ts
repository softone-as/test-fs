import { UserResponse } from 'apps/backoffice/src/modules/iam/responses/user.response';

type IUser = UserResponse;

type IUserForm = Pick<
    UserResponse,
    'fullname' | 'password' | 'email' | 'phoneNumber' | 'roles'
>;

export { IUser, IUserForm };
