import { StudioIndexSchema } from 'apps/backoffice/@contracts/cinema/studio/studio-index.contract';
import { createZodDto } from 'nestjs-zod';

export class StudioIndexRequest extends createZodDto(StudioIndexSchema) {}
