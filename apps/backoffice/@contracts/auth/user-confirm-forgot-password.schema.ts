import { z } from 'zod';

export const UserConfirmForgotPasswordSchema = z.object({
    password: z
        .string()
        .min(8)
        .regex(/(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/, {
            message: 'password too weak, min 1 number & 1 alphabet ',
        }),
});

export type TUserConfirmForgotPasswordSchema = z.infer<
    typeof UserConfirmForgotPasswordSchema
>;
