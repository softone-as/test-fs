import { IOrderItem } from 'interface-models/order/order-item.interface';
import { z } from 'zod';

export const orderItemCreateSchema = z.object({
    qty: z.coerce
        .number({
            required_error: 'Field wajib diisi',
            invalid_type_error: 'Field harus berupa angka',
        })
        .min(1, {
            message: 'Minimal 1 item',
        }),
    price: z.coerce.number({
        required_error: 'Field wajib diisi',
        invalid_type_error: 'Field harus berupa angka',
    }),
    subTotalPrice: z.coerce.number().optional(),
    snapshots: z
        .array(z.instanceof(File))
        .superRefine((value) => {
            value.filter((file) => {
                return file instanceof File;
            });
        })
        .optional(),
});

export type TOrderItemCreateSchema = z.infer<typeof orderItemCreateSchema>;

export type TCOrderItemFormProps = {
    id?: number;
    data?: IOrderItem;
    isUpdate?: boolean;
};
