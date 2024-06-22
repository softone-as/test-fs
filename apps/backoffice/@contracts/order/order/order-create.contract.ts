import { PaymentMethodEnum } from 'apps/backoffice/src/common/enums/transaction.enum';
import { z } from 'zod';
import { orderItemCreateSchema } from '../order-item/order-item-create.contract';
import { IOrder } from 'interface-models/order/order.interface';
import { IFilterOption } from 'apps/backoffice/src/common/interface/response.interface';

export const orderItemSchema = orderItemCreateSchema.extend({
    movieScheduleId: z.coerce.number({
        required_error: 'Field wajib diisi',
        invalid_type_error: 'Field harus berupa angka',
    }),
});

export const OrderCreateSchema = z.object({
    paymentMethod: z.nativeEnum(PaymentMethodEnum, {
        required_error: 'Field wajib diisi',
    }),
    totalItemPrice: z.coerce.number().optional(),
    orderItems: z.array(orderItemSchema).nonempty({
        message: 'Field wajib diisi',
    }),
});

export type TOrderCreateSchema = z.infer<typeof OrderCreateSchema>;

export type TCOrderFormProps = {
    id?: number;
    data?: IOrder;
    isUpdate?: boolean;
    paymentMethods: IFilterOption[];
    movieSchedules: IFilterOption[];
};
