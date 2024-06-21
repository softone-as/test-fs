import { MovieScheduleEditSchema } from 'apps/backoffice/@contracts/movie/movie-schedule/movie-schedule-edit.contract';
import { createZodDto } from 'nestjs-zod';

export class MovieScheduleEditRequest extends createZodDto(
    MovieScheduleEditSchema,
) {}
