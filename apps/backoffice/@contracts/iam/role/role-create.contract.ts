import { IPermission } from 'interface-models/iam/permission.interface';
import { z } from 'zod';

export const RoleCreateSchema = z.object({
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

export type TCRoleCreateProps = {
    permissions: IPermission[];
};
