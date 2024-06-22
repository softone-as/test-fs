import { createZodDto } from 'nestjs-zod';
import { _orderCreateItemSchema } from './order-create.request';
import { OrderEditSchema } from 'apps/backoffice/@contracts/order/order/order-edit.contract';
import { z } from 'zod';

export class OrderEditRequest extends createZodDto(
    OrderEditSchema.omit({ orderItems: true }).extend({
        orderItems: z.array(_orderCreateItemSchema).nonempty({
            message: 'Field wajib diisi',
        }),
    }),
) {}
