import { PermissionType } from '../../Permission/Entity/Permission';
import { RoleType } from '../../Role/Entity/Role';

export type RolePermissionType = {
    id: string;
    role: Omit<RoleType, 'permissions'>;
    permission: Omit<PermissionType, 'roles'>;
};

export type FormRolePermissionType = Omit<RolePermissionType, 'id'> & {
    roleId: number;
    permissionId: number;
};
