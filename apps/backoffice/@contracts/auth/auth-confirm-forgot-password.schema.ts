import { z } from 'zod';

export const AuthConfirmForgotPasswordSchema = z.object({
    password: z
        .string()
        .min(8)
        .regex(/(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/, {
            message: 'password too weak, min 1 number & 1 alphabet ',
        }),
});

export type TAuthConfirmForgotPasswordSchema = z.infer<
    typeof AuthConfirmForgotPasswordSchema
>;
