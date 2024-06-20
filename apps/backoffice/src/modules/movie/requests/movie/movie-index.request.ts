import { MovieIndexSchema } from 'apps/backoffice/@contracts/movie/movie/movie-index.contract';
import { createZodDto } from 'nestjs-zod';

export class MovieIndexRequest extends createZodDto(MovieIndexSchema) {}
