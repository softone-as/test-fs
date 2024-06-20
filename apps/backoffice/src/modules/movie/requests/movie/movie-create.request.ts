import { MovieCreateSchema } from 'apps/backoffice/@contracts/movie/movie/movie-create.contract';
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const posterSchema = z.object({
    poster: z.string().optional(),
});

export class MovieCreateRequest extends createZodDto(
    MovieCreateSchema.omit({ poster: true }).merge(posterSchema),
) {}
