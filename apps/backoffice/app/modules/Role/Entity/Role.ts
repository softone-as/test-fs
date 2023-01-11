import { PermissionType } from '../../Permission/Entity/Permission';
import { RoleResponse } from '../../../../src/modules/iam/responses/role.response';

export type RoleType = Omit<RoleResponse, 'permissions'> & {
    permissions: Omit<PermissionType, 'roles'>[];
};

export type FormRoleType = Omit<RoleType, 'id'>;
