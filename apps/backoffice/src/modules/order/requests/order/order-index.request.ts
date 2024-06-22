import { OrderIndexSchema } from 'apps/backoffice/@contracts/order/order/order-index.contract';
import { createZodDto } from 'nestjs-zod';

export class OrderIndexRequest extends createZodDto(OrderIndexSchema) {}
