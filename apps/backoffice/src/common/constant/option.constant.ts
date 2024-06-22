import { PaymentMethodEnum } from '../enums/transaction.enum';

export const PAYMENT_METHODS_OPTIONS = Object.values(PaymentMethodEnum).map(
    (value) => ({
        label: value.toUpperCase(),
        value,
    }),
);
