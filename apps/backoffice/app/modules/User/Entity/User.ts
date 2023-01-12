import { UserResponse } from '../../../../src/modules/iam/responses/user.response';

export type FormUserType = Omit<UserResponse, 'id' | 'role' | 'password'> & {
    roleId: number;
    password: string;
};

export type LoginType = {
    email: string;
    password: string;
};

export type ForgotPasswordType = {
    email: string;
};

export type ChangePasswordType = {
    password: string;
    retypePassword: string;
};
