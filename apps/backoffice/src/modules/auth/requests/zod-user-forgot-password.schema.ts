import z from 'zod';

export const ZodUserForgotPasswordSchema = z.object({
    email: z.string().email(),
});
