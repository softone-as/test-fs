import { IRole } from 'interface-models/iam/role.interface';
import { TCRoleCreateProps } from './role-create.contract';
import { z } from 'zod';

export const RoleEditSchema = z.object({
    name: z.string({
        required_error: 'Field wajib diisi',
        invalid_type_error: 'Harus berupa string',
    }),
    key: z.string({
        required_error: 'Field wajib diisi',
        invalid_type_error: 'Harus berupa string',
    }),
    permissionIds: z
        .number({
            required_error: 'Field wajib diisi',
        })
        .array()
        .nonempty('Field wajib diisi'),
});

export type TCRoleEditProps = TCRoleCreateProps & {
    data: IRole;
};
