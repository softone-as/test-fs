import { PaymentMethodEnum } from 'apps/backoffice/src/common/enums/transaction.enum';
import { BaseEntity } from 'entities/base.entity';
import { IOrderItem } from 'interface-models/order/order-item.interface';
import { IOrder } from 'interface-models/order/order.interface';
import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderItem } from './order-item.entity';
import { IUser } from 'interface-models/iam/user.interface';
import { User } from 'entities/iam/user.entity';

@Entity({ name: 'orders' })
export class Order extends BaseEntity implements IOrder {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'enum',
        enum: PaymentMethodEnum,
        nullable: false,
    })
    paymentMethod: PaymentMethodEnum;

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        nullable: false,
    })
    totalItemPrice: number;

    @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
    orderItems: IOrderItem[];

    @ManyToOne(() => User, (user) => user.orders)
    user: IUser;
}
