import { UserResponse } from '../../../../src/modules/iam/responses/user.response';
import { RoleType } from '../../Role/Entity/Role';
import { UserAddressType } from '../../UserAddress/Entity/UserAddress';

export type UserType = Omit<UserResponse, ''>

export type FormUserType = Omit<UserType, 'id' | 'role' | 'password'> & {
    roleId: string;
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
