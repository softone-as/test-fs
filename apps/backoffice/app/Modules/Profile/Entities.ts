import { UserCreateRequest } from '../../../src/modules/iam/requests/user-create.request';
import { UserResponse } from '../../../src/modules/iam/responses/user.response';

type IUser = UserResponse;

type IProfileForm = Omit<UserCreateRequest, 'roles' | 'password'>;

type IProfileFormPassword = {
    password: string;
    passwordConfirm: string;
};

export { IUser, IProfileForm, IProfileFormPassword };
