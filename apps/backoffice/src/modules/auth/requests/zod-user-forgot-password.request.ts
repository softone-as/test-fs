import { z } from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod';

export const ZodUserForgotPasswordSchema = z.object({
    email: z.string().email(),
});

export class ZodUserForgotPasswordRequest extends createZodDto(
    ZodUserForgotPasswordSchema,
) {}
