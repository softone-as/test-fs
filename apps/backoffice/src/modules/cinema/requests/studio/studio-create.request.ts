import { StudioCreateSchema } from 'apps/backoffice/@contracts/cinema/studio/studio-create.contract';
import { createZodDto } from 'nestjs-zod';

export class StudioCreateRequest extends createZodDto(StudioCreateSchema) {}
