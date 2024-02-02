import { createZodDto } from 'nestjs-zod';
import { ZodUserForgotPasswordSchema } from './zod-user-forgot-password.schema';

export class ZodUserForgotPasswordRequest extends createZodDto(
    ZodUserForgotPasswordSchema,
) {}
