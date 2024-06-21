import { OrderItemEditSchema } from 'apps/backoffice/@contracts/order/order-item-edit.contract';
import { createZodDto } from 'nestjs-zod';
import { snapshotsSchema } from './order-item-create.request';

export class OrderItemEditRequest extends createZodDto(
    OrderItemEditSchema.omit({ snapshots: true }).merge(snapshotsSchema),
) {}
