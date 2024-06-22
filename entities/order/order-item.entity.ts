import { BaseEntity } from 'entities/base.entity';
import { IOrderItem } from 'interface-models/order/order-item.interface';
import { IOrder } from 'interface-models/order/order.interface';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order.entity';
import { MovieSchedule } from 'entities/movie/movie-schedule.entity';
import { IMovieSchedule } from 'interface-models/movie/movie-schedule.interface';

@Entity({ name: 'order_items' })
export class OrderItem extends BaseEntity implements IOrderItem {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'int',
        nullable: false,
    })
    qty: number;

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        nullable: false,
    })
    price: number;

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        nullable: false,
    })
    subTotalPrice: number;

    @Column({
        type: 'json',
        nullable: false,
    })
    snapshots: string[];

    @ManyToOne(() => Order, (order) => order.orderItems, {
        onDelete: 'CASCADE',
    })
    order: IOrder;

    @ManyToOne(() => MovieSchedule, (movieSchedule) => movieSchedule.orderItems)
    movieSchedule: IMovieSchedule;
}
