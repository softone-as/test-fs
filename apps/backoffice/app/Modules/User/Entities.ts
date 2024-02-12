import { ProfileDetailResponse } from 'aws-sdk/clients/rolesanywhere';
import { UserCreateRequest } from '../../../src/modules/iam/requests/user-create.request';
import { UserResponse } from '../../../src/modules/iam/responses/user.response';

type IUser = UserResponse;

type IUserForm = Omit<UserCreateRequest, 'roles'>;

type IProfile = ProfileDetailResponse;

export { IUser, IProfile, IUserForm };
