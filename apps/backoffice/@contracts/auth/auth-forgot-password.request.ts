import { createZodDto } from 'nestjs-zod';
import { AuthForgotPasswordSchema } from './auth-forgot-password.schema';

export class AuthForgotPasswordRequest extends createZodDto(
    AuthForgotPasswordSchema,
) {}
