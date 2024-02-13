import { UserCreateRequest } from 'apps/backoffice/src/modules/iam/requests/user-create.request';
import { ProfileResponse } from 'apps/backoffice/src/modules/profile/responses/profile.response';

type IUserForm = Omit<UserCreateRequest, 'roles'>;

type IProfile = ProfileResponse;

export { IProfile, IUserForm };
