import { IPaginateResponse } from 'apps/backoffice/src/common/interface/index.interface';
import { IFilterOption } from 'apps/backoffice/src/common/interface/response.interface';
import { IndexRequestSchema } from 'apps/backoffice/src/common/request/index.request';
import { IMovieSchedule } from 'interface-models/movie/movie-schedule.interface';
import { z } from 'zod';

export const MovieScheduleIndexSchema = IndexRequestSchema.extend({
    studioId: z.coerce.number().optional(),
    date: z.coerce.date().optional(),
});

export type TMovieScheduleIndexSchema = z.infer<
    typeof MovieScheduleIndexSchema
>;

export type TCMovieScheduleIndexProps = IPaginateResponse<IMovieSchedule> & {
    studios: IFilterOption[];
};
