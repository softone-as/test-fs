import { OrderItemCreateRequest } from 'apps/backoffice/src/modules/order/requests/order-item/order-item-create.request';

export type IFormOrderItem = Omit<OrderItemCreateRequest, ''>;
