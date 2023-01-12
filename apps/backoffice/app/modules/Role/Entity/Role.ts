import { RoleResponse } from '../../../../src/modules/iam/responses/role.response';

export type FormRoleType = Omit<RoleResponse, 'id' | 'permissions'>;
