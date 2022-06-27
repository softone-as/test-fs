import { IRolePermission } from 'interface-models/iam/role-permission.interface';
import { PermissionResponse } from './permission.response';
import { RoleResponse } from './role.response';

export class RolePermissionResponse {
    id: number;
    role: RoleResponse;
    permission: PermissionResponse;
    createdAt?: Date;
    updatedAt?: Date;

    static fromEntites(
        rolePermissions: IRolePermission[],
    ): RolePermissionResponse[] {
        return rolePermissions.map((rolePermission) => {
            return {
                id: rolePermission.id,
                role: RoleResponse.fromEntity(rolePermission.role),
                permission: RoleResponse.fromEntity(rolePermission.permission),
                createdAt: rolePermission.createdAt,
                updatedAt: rolePermission.updatedAt,
            };
        });
    }
}
