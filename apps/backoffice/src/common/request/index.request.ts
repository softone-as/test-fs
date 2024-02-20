import { OrderDirectionEnum } from '../enums/index.enum';
import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const IndexRequestSchema = z.object({
    sort: z.string().optional().default('updatedAt'),
    order: z.nativeEnum(OrderDirectionEnum).optional(),
    perPage: z.coerce.number().min(1).optional().default(15),
    page: z.coerce.number().min(1).optional().default(1),
    search: z.string().optional(),
});

export class IndexRequest extends createZodDto(IndexRequestSchema) {}
