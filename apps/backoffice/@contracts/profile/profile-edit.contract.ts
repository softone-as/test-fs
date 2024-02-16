import { GenderEnum } from 'apps/backoffice/app/Common/Enums/Gender.enum';
import { z } from 'zod';

export const ProfileEditSchema = z.object({
    fullname: z.string().min(3).nonempty('Field fullname is required'),
    email: z.string().email().nonempty('Field email is required'),
    phoneNumber: z.string().nonempty('Field phone number is required'),
    identityNumber: z.string().nonempty('Field identityNumber is required'),
    gender: z.nativeEnum(GenderEnum),
    birthDate: z.coerce.date(),
});

export type TProfileEditSchema = z.infer<typeof ProfileEditSchema>;
