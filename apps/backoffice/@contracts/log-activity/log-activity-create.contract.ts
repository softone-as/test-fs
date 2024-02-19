import { z } from 'zod';

export const LogActivityCreateSchema = z.object({
    userId: z.number().nullable(),
    source: z.string(),
    activity: z.string(),
    menu: z.string(),
    path: z.string(),
    metaData: z.any(),
});
