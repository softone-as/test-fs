import { TagIndexSchema } from 'apps/backoffice/@contracts/cinema/tag/tag-index.contract';
import { createZodDto } from 'nestjs-zod';

export class TagIndexRequest extends createZodDto(TagIndexSchema) {}
