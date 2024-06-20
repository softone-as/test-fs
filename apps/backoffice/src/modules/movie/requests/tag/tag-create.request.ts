import { TagCreateSchema } from 'apps/backoffice/@contracts/movie/tag/tag-create.contract';
import { createZodDto } from 'nestjs-zod';

export class TagCreateRequest extends createZodDto(TagCreateSchema) {}
