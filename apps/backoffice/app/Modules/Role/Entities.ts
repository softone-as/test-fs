import { RoleCreateRequest } from 'apps/backoffice/src/modules/iam/requests/role-create.request';

type IRoleForm = Omit<RoleCreateRequest, ''>;

export { IRoleForm };
