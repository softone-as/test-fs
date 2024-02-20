import { IPaginateResponse } from 'apps/backoffice/src/common/interface/index.interface';
import { IndexRequestSchema } from 'apps/backoffice/src/common/request/index.request';
import { ILogActivity } from 'interface-models/log-activity/log-activity.interface';
import { z } from 'zod';

export const LogActivityIndexSchema = IndexRequestSchema.extend({
    startAt: z.string().optional(),
    endAt: z.string().optional(),
    menu: z.string().optional(),
});

export type TLogActivityIndexSchema = z.infer<typeof LogActivityIndexSchema>;

export type TCLogActivityIndexProps = IPaginateResponse<ILogActivity>;
