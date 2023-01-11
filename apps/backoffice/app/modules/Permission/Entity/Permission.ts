import { PermissionResponse } from 'apps/backoffice/src/modules/iam/responses/permission.response';
import { RoleType } from '../../Role/Entity/Role';

export type PermissionType = Omit<PermissionResponse, 'roles'> & {
    roles: Omit<RoleType, 'permissions'>[];
};

export type FormPermissionType = Omit<PermissionType, 'id' | 'roles'>;
