import { createZodDto } from 'nestjs-zod';
import {
    AuthForgotPasswordSchema,
    TAuthForgotPasswordSchema,
} from './auth-forgot-password.schema';

export class AuthForgotPasswordRequest
    extends createZodDto(AuthForgotPasswordSchema)
    implements TAuthForgotPasswordSchema {}
