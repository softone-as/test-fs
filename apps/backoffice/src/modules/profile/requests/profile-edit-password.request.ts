import { createZodDto } from 'nestjs-zod';
import { ProfileEditPasswordSchema } from 'apps/backoffice/@contracts/profile/profile-edit-password.contract';

export class ProfileEditPasswordRequest extends createZodDto(
    ProfileEditPasswordSchema,
) {}
