import { TCRoleDetailProps } from 'apps/backoffice/@contracts/iam/role/role-detail.contract';
import { IRole } from 'interface-models/iam/role.interface';

export class RoleResponse {
    public static fromEntity = (role: IRole): TCRoleDetailProps['data'] => ({
        id: role.id,
        name: role.name,
        key: role.key,
        permissions: role.permissions,
        createdAt: role.createdAt,
        updatedAt: role.updatedAt,
        deletedAt: role.deletedAt,
    });
}
