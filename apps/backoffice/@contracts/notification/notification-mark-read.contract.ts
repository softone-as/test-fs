import { z } from 'zod';

export const notificationMarkReadSchema = z.object({
    notificationIds: z.array(z.number()),
});
