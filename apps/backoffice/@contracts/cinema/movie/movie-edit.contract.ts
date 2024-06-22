import { z } from 'zod';
import { MovieCreateSchema } from './movie-create.contract';

export const MovieEditSchema = MovieCreateSchema.omit({ poster: true }).extend({
    poster: z.instanceof(File).optional(),
});

export const MovieBulkUpdatePlayUntilSchema = z.object({
    ids: z.array(z.number()).nonempty({
        message: 'Field wajib diisi',
    }),
    playUntil: z.coerce.date(),
});
