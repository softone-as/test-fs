import { z } from 'zod';

export const LogActivityCreateSchema = z.object({
    user_id: z.number(),
    source: z.string(),
    activity: z.string(),
    menu: z.string(),
    path: z.string(),
    metaData: z.any(),
});
