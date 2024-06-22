import { IFilterOption } from 'apps/backoffice/src/common/interface/response.interface';
import { IMovie } from 'interface-models/movie/movie.interface';
import { z } from 'zod';

export const MovieCreateSchema = z.object({
    title: z
        .string({
            required_error: 'Field wajib diisi',
        })
        .min(1, {
            message: 'Field wajib diisi',
        }),
    overview: z
        .string({
            required_error: 'Field wajib diisi',
        })
        .min(1, {
            message: 'Field wajib diisi',
        }),
    poster: z.instanceof(File),

    playUntil: z.coerce.date({
        required_error: 'Field wajib diisi',
    }),
    tags: z.array(z.coerce.number()).nonempty({
        message: 'Field wajib diisi',
    }),
    isTMDB: z.boolean().default(false),
});

export type TMovieCreateSchema = z.infer<typeof MovieCreateSchema>;

export type TCMovieFormProps = {
    tags: IFilterOption[];
    id?: number;
    data?: IMovie;
    isUpdate?: boolean;
};
