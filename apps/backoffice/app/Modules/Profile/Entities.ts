import { UserCreateRequest } from '../../../src/modules/iam/requests/user-create.request';

type IProfileForm = Omit<UserCreateRequest, 'roles' | 'password'>;

type IProfileFormPassword = {
    password: string;
    passwordConfirm: string;
};

export { IProfileForm, IProfileFormPassword };
