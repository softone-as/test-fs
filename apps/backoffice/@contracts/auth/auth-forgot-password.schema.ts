import z from 'zod';

export const AuthForgotPasswordSchema = z.object({
    email: z.string().email(),
});

export type TAuthForgotPasswordSchema = z.infer<
    typeof AuthForgotPasswordSchema
>;
