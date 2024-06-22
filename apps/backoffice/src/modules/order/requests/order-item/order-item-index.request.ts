import { OrderItemIndexSchema } from 'apps/backoffice/@contracts/order/order-item/order-item-index.contract';
import { createZodDto } from 'nestjs-zod';

export class OrderItemIndexRequest extends createZodDto(OrderItemIndexSchema) {}
