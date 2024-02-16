import { z } from 'zod';

export const ProfileEditPasswordSchema = z.object({
    password: z
        .string({
            required_error: 'Field wajib diisi',
        })
        .min(8)
        .regex(/(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/, {
            message: 'password too weak, min 1 number & 1 alphabet ',
        }),
    passwordConfirm: z
        .string({
            required_error: 'Field wajib diisi',
        })
        .min(8)
        .regex(/(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/, {
            message: 'password too weak, min 1 number & 1 alphabet ',
        }),
});
