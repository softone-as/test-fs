import { IPermission } from 'interface-models/iam/permission.interface';
import { TCPermissionDetailProps } from 'apps/backoffice/@contracts/iam/permission/permission-detail.contract';

export class PermissionResponse {
    public static fromEntity = (
        permission: IPermission,
    ): TCPermissionDetailProps['data'] => ({
        id: permission.id,
        name: permission.name,
        key: permission.key,
        roles: permission.roles,
    });
}
