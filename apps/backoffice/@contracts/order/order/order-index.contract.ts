import { PaymentMethodEnum } from 'apps/backoffice/src/common/enums/transaction.enum';
import { IPaginateResponse } from 'apps/backoffice/src/common/interface/index.interface';
import { IFilterOption } from 'apps/backoffice/src/common/interface/response.interface';
import { IndexRequestSchema } from 'apps/backoffice/src/common/request/index.request';
import { IOrder } from 'interface-models/order/order.interface';
import { z } from 'zod';

export const OrderIndexSchema = IndexRequestSchema.extend({
    paymentMethod: z.nativeEnum(PaymentMethodEnum).optional(),
});

export type TOrderIndexSchema = z.infer<typeof OrderIndexSchema>;

export type TCOrderIndexProps = IPaginateResponse<IOrder> & {
    paymentMethods: IFilterOption[];
};
