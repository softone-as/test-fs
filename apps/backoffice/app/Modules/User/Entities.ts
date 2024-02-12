import { UserCreateRequest } from '../../../src/modules/iam/requests/user-create.request';
import { UserResponse } from '../../../src/modules/iam/responses/user.response';
import { ProfileResponse } from '../../../src/modules/profile/responses/profile.response';

type IUser = UserResponse;

type IUserForm = Omit<UserCreateRequest, 'roles'>;

type IProfile = ProfileResponse;

export { IUser, IProfile, IUserForm };
