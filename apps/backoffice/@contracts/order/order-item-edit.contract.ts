import { z } from 'zod';
import { orderItemCreateSchema } from './order-item-create.contract';

export const OrderItemEditSchema = orderItemCreateSchema
    .omit({
        snapshots: true,
    })
    .extend({
        snapshots: z.array(z.instanceof(File).optional()),
    });
