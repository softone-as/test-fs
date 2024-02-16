import { ProfileEditSchema } from 'apps/backoffice/@contracts/profile/profile-edit.contract';
import { createZodDto } from 'nestjs-zod';

export class ProfileEditRequest extends createZodDto(ProfileEditSchema) {}
