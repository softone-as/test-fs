import { MovieScheduleIndexSchema } from 'apps/backoffice/@contracts/movie/movie-schedule/movie-schedule-index.contract';
import { createZodDto } from 'nestjs-zod';

export class MovieScheduleIndexRequest extends createZodDto(
    MovieScheduleIndexSchema,
) {}
