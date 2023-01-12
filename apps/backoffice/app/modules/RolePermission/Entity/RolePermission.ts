import { RolePermissionResponse } from '../../../../src/modules/iam/responses/role-permission.response';

export type FormRolePermissionType = Omit<
    RolePermissionResponse,
    'id' | 'role' | 'permission'
> & {
    roleId: number;
    permissionId: number;
};
