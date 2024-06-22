import { MovieScheduleCreateSchema } from 'apps/backoffice/@contracts/cinema/movie-schedule/movie-schedule-create.contract';
import { createZodDto } from 'nestjs-zod';

export class MovieScheduleCreateRequest extends createZodDto(
    MovieScheduleCreateSchema,
) {}
