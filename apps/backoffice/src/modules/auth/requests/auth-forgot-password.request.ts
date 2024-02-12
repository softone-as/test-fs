import { createZodDto } from 'nestjs-zod';
import { AuthForgotPasswordSchema } from '../../../../@contracts/auth/auth-forgot-password.schema';

export class AuthForgotPasswordRequest extends createZodDto(
    AuthForgotPasswordSchema,
) {}
