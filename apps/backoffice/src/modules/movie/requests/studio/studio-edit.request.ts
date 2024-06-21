import { StudioEditSchema } from 'apps/backoffice/@contracts/movie/studio/studio-edit.contract';
import { createZodDto } from 'nestjs-zod';

export class StudioEditRequest extends createZodDto(StudioEditSchema) {}
