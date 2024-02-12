import { createZodDto } from 'nestjs-zod';
import { UserConfirmForgotPasswordSchema } from './user-confirm-forgot-password.schema';

export class UserConfirmForgotPasswordRequest extends createZodDto(
    UserConfirmForgotPasswordSchema,
) {}
