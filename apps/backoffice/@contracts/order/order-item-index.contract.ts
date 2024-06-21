import { IPaginateResponse } from 'apps/backoffice/src/common/interface/index.interface';
import { IndexRequestSchema } from 'apps/backoffice/src/common/request/index.request';
import { IOrderItem } from 'interface-models/order/order-item.interface';
import { z } from 'zod';

export const OrderItemIndexSchema = IndexRequestSchema.extend({
    price: z.coerce.number().optional(),
});

export type TOrderItemIndexSchema = z.infer<typeof OrderItemIndexSchema>;

export type TCOrderItemIndexProps = IPaginateResponse<IOrderItem>;
