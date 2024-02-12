import { IRole } from 'interface-models/iam/role.interface';
import { TCRoleCreateProps } from './role-create.contract';

export type TCRoleEditProps = TCRoleCreateProps & {
    data: IRole;
};
