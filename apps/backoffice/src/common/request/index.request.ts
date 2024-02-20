import { OrderDirectionEnum } from '../enums/index.enum';
import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const IndexRequestSchema = z.object({
    sort: z.string().default('updatedAt'),
    order: z.nativeEnum(OrderDirectionEnum).optional(),
    perPage: z.coerce.number().min(1).default(15).optional(),
    page: z.coerce.number().min(1).default(1).optional(),
    search: z.string().optional(),
});

export class IndexRequest extends createZodDto(IndexRequestSchema) {}
