import { z } from 'zod';

export const UserBulkDeleteSchema = z.object({
    ids: z.array(z.number()).nonempty(),
});

export type TUserBulkDeleteSchema = z.infer<typeof UserBulkDeleteSchema>;
