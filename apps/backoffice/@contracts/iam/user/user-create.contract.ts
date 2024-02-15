import { IRole } from 'interface-models/iam/role.interface';
import { z } from 'zod';

export const UserCreateSchema = z.object({
    fullname: z
        .string({
            required_error: 'Field wajib diisi',
        })
        .min(3),
    email: z
        .string({
            required_error: 'Field wajib diisi',
        })
        .email(),
    password: z
        .string({
            required_error: 'Field wajib diisi',
        })
        .min(8)
        .regex(/(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/, {
            message: 'password too weak, min 1 number & 1 alphabet ',
        }),
    phoneNumber: z
        .string({
            required_error: 'Field wajib diisi',
        })
        .min(10),
    roles: z.array(z.number()),
});

export type TUserCreateSchema = z.infer<typeof UserCreateSchema>;

export type TCUserCreateProps = {
    roles: IRole[];
};
