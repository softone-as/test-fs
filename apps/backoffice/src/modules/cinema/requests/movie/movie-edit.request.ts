import {
    MovieEditSchema,
    MovieBulkUpdatePlayUntilSchema,
} from 'apps/backoffice/@contracts/cinema/movie/movie-edit.contract';
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const posterSchema = z.object({
    poster: z.string().optional(),
});

export class MovieEditRequest extends createZodDto(
    MovieEditSchema.omit({ poster: true }).merge(posterSchema),
) {}

export class MovieBulkUpdatePlayUntilRequest extends createZodDto(
    MovieBulkUpdatePlayUntilSchema,
) {}

export class UpdatePlayUntilRequest extends createZodDto(
    MovieBulkUpdatePlayUntilSchema.omit({ ids: true }).merge(
        z.object({
            id: z.number(),
        }),
    ),
) {}
