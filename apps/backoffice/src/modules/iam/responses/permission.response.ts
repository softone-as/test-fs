import { IPermission } from 'interface-models/iam/permission.interface';

export class PermissionResponse {
    id: number;
    name: string;
    key: string;
    createdAt?: Date;
    updatedAt?: Date;

    static fromEntity(permission: IPermission): PermissionResponse {
        return {
            id: permission.id,
            key: permission.key,
            name: permission.name,
            createdAt: permission.createdAt,
            updatedAt: permission.updatedAt,
        };
    }

    static fromEntities(permissions: IPermission[]): PermissionResponse[] {
        return permissions.map((permission) =>
            PermissionResponse.fromEntity(permission),
        );
    }
}
