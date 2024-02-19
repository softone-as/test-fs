import { z } from 'zod';

export const AuthLoginSchema = z.object({
    email: z
        .string({
            required_error: 'Field Email wajib diisi',
        })
        .email({
            message: 'Field Email wajib berformat email',
        }),
    password: z.string({
        required_error: 'Field Password wajib diisi',
    }),
});

export type TAuthLoginSchema = z.infer<typeof AuthLoginSchema>;

export type TCAuthLoginProps = {
    data: {
        id?: number;
        fullname?: string;
        email: string;
        createdAt?: Date;
        updatedAt?: Date;
    };
};
