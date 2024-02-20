import { z } from 'zod';

export const PermissionsEditSchema = z.object({
    name: z.string(),
    key: z.string(),
});

export type TPermissionsEditSchema = z.infer<typeof PermissionsEditSchema>;
