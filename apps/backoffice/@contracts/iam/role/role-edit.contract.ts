import { IRole } from 'interface-models/iam/role.interface';
import { RoleCreateSchema, TCRoleCreateProps } from './role-create.contract';

export const RoleEditSchema = RoleCreateSchema.extend({});

export type TCRoleEditProps = TCRoleCreateProps & {
    data: IRole;
};
