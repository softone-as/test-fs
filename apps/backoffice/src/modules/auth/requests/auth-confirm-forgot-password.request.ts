import { AuthConfirmForgotPasswordSchema } from 'apps/backoffice/@contracts/auth/auth-confirm-forgot-password.contract';
import { createZodDto } from 'nestjs-zod';

export class AuthConfirmForgotPasswordRequest extends createZodDto(
    AuthConfirmForgotPasswordSchema,
) {}
