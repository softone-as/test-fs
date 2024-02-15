import { AuthForgotPasswordSchema } from 'apps/backoffice/@contracts/auth/auth-forgot-password.contract';
import { createZodDto } from 'nestjs-zod';

export class AuthForgotPasswordRequest extends createZodDto(
    AuthForgotPasswordSchema,
) {}
