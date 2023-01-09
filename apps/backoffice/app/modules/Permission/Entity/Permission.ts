import { RoleType } from '../../Role/Entity/Role';

export type PermissionType = {
    id: string;
    name: string;
    key: string;
    roles: Omit<RoleType, 'permissions'>[];
};

export type FormPermissionType = Omit<PermissionType, 'id' | 'roles'>;
