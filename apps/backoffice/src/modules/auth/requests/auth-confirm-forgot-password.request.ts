import { createZodDto } from 'nestjs-zod';
import { AuthConfirmForgotPasswordSchema } from '../../../../@contracts/auth/auth-confirm-forgot-password.schema';

export class AuthConfirmForgotPasswordRequest extends createZodDto(
    AuthConfirmForgotPasswordSchema,
) {}
