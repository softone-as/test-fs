import { createZodDto } from 'nestjs-zod';
import { snapshotsSchema } from './order-item-create.request';
import { OrderItemEditSchema } from 'apps/backoffice/@contracts/order/order-item/order-item-edit.contract';

export class OrderItemEditRequest extends createZodDto(
    OrderItemEditSchema.omit({ snapshots: true }).merge(snapshotsSchema),
) {}
