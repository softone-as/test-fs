import { IFilterOption } from 'apps/backoffice/src/common/interface/response.interface';
import { IMovieSchedule } from 'interface-models/movie/movie-schedule.interface';
import { z } from 'zod';

export const MovieScheduleCreateSchema = z.object({
    movieId: z.coerce
        .number({ required_error: 'Field wajib diisi' })
        .min(1, 'Minimum 1'),
    studioId: z.coerce
        .number({ required_error: 'Field wajib diisi' })
        .min(1, 'Minimum 1'),
    startTime: z.coerce.date({
        required_error: 'Field wajib diisi',
    }),
    endTime: z.coerce.date({
        required_error: 'Field wajib diisi',
    }),
    price: z.coerce.number({
        required_error: 'Field wajib diisi',
    }),
    date: z.coerce.date({
        required_error: 'Field wajib diisi',
    }),
});

export type TMovieScheduleCreateSchema = z.infer<
    typeof MovieScheduleCreateSchema
>;

export type TCMovieScheduleFormProps = {
    movies: IFilterOption[];
    studios: IFilterOption[];
    id?: number;
    data?: IMovieSchedule;
    isUpdate?: boolean;
};
