import { IBaseEntity } from 'interface-models/base-entity.interface';
import { IOrderItem } from './order-item.interface';
import { PaymentMethodEnum } from 'apps/backoffice/src/common/enums/transaction.enum';
import { IUser } from 'interface-models/iam/user.interface';

export interface IOrder extends IBaseEntity {
    orderItems: IOrderItem[];
    paymentMethod: PaymentMethodEnum;
    totalItemPrice: number;
    user: IUser;
}
