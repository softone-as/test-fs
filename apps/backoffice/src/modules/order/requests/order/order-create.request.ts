import {
    OrderCreateSchema,
    orderItemSchema,
} from 'apps/backoffice/@contracts/order/order/order-create.contract';
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const snapshotsSchema = z.object({
    snapshots: z.array(z.string()).optional(),
});

//eslint-disable-next-line @typescript-eslint/naming-convention
export const _orderCreateItemSchema = orderItemSchema
    .omit({ snapshots: true })
    .merge(snapshotsSchema);

export class OrderCreateRequest extends createZodDto(
    OrderCreateSchema.omit({ orderItems: true }).extend({
        orderItems: z.array(_orderCreateItemSchema).nonempty({
            message: 'Field wajib diisi',
        }),
    }),
) {}
