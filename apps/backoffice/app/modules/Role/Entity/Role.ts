import { PermissionType } from '../../Permission/Entity/Permission';

export type RoleType = {
    id: string;
    name: string;
    key: string;
    permissions: Omit<PermissionType, 'roles'>[];
};

export type FormRoleType = Omit<RoleType, 'id'>;
