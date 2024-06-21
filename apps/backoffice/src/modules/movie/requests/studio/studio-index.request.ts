import { StudioIndexSchema } from 'apps/backoffice/@contracts/movie/studio/studio-index.contract';
import { createZodDto } from 'nestjs-zod';

export class StudioIndexRequest extends createZodDto(StudioIndexSchema) {}
