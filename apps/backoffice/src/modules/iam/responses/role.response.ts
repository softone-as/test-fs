import { IRole } from 'interface-models/iam/role.interface';
import { PermissionResponse } from './permission.response';

export class RoleResponse {
    id: number;

    name: string;

    key: string;

    permissions?: PermissionResponse[];

    createdAt?: Date;

    updatedAt?: Date;

    static fromEntity(role: IRole): RoleResponse {
        return {
            id: role.id,
            key: role.key,
            name: role.name,
            permissions: PermissionResponse.fromEntities(role.permissions),
            createdAt: role.createdAt,
            updatedAt: role.updatedAt,
        };
    }

    static fromEntities(roles: IRole[]): RoleResponse[] {
        return roles.map((role) => RoleResponse.fromEntity(role));
    }
}
