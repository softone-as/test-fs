import { IPermission } from 'interface-models/iam/permission.interface';
import { TPermissionResponse } from 'apps/backoffice/@contracts/iam/permission/permission-response.contract';

export class PermissionResponse {
    public static fromEntity = (
        permission: IPermission,
    ): TPermissionResponse => ({
        id: permission.id,
        name: permission.name,
        key: permission.key,
        roles: permission.roles,
    });
}
