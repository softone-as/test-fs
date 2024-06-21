import { IOrderItem } from 'interface-models/order/order-item.interface';
import { z } from 'zod';

export const orderItemCreateSchema = z.object({
    qty: z.coerce
        .number({
            required_error: 'Field wajib diisi',
        })
        .min(1, {
            message: 'Minimal 1 item',
        }),
    price: z.coerce.number({
        required_error: 'Field wajib diisi',
    }),
    subTotalPrice: z.coerce.number({
        required_error: 'Field wajib diisi',
    }),
    snapshots: z
        .array(z.instanceof(File))
        .nonempty({
            message: 'Field wajib diisi',
        })
        .superRefine((value) => {
            value.filter((file) => {
                return file instanceof File;
            });
        }),
});

export type TOrderItemCreateSchema = z.infer<typeof orderItemCreateSchema>;

export type TCOrderItemFormProps = {
    id?: number;
    data?: IOrderItem;
    isUpdate?: boolean;
};
