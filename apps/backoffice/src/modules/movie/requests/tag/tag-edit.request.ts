import { TagEditSchema } from 'apps/backoffice/@contracts/movie/tag/tag-edit.contract';
import { createZodDto } from 'nestjs-zod';

export class TagEditRequest extends createZodDto(TagEditSchema) {}
