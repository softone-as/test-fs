import { orderItemCreateSchema } from 'apps/backoffice/@contracts/order/order-item/order-item-create.contract';
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const snapshotsSchema = z.object({
    snapshots: z.array(z.string()).optional(),
});

export class OrderItemCreateRequest extends createZodDto(
    orderItemCreateSchema.omit({ snapshots: true }).merge(snapshotsSchema),
) {}
