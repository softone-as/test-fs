import { RoleCreateRequest } from 'apps/backoffice/src/modules/iam/requests/role-create.request';
import { TRoleResponse } from 'apps/backoffice/@contracts/iam/role/role.response.contract';

type IRoleForm = Omit<RoleCreateRequest, ''>;

type IRole = TRoleResponse;

export { IRole, IRoleForm };
