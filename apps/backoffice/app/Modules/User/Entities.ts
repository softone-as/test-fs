import { UserCreateRequest } from 'apps/backoffice/src/modules/iam/requests/user-create.request';
import { UserResponse } from 'apps/backoffice/src/modules/iam/responses/user.response';

type IUser = UserResponse;

type IUserForm = Omit<UserCreateRequest, 'roles'>;

export { IUser, IUserForm };
