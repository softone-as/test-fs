import { TCRoleCreateProps } from './role-create.contract';
import { TRoleResponse } from './role.response.contract';

export type TCRoleEditProps = TCRoleCreateProps & {
    data: TRoleResponse;
};
