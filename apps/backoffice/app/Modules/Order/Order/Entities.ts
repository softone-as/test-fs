import { OrderCreateRequest } from 'apps/backoffice/src/modules/order/requests/order/order-create.request';

export type IFormOrder = Omit<OrderCreateRequest, ''>;
