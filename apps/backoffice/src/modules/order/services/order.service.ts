import { Injectable } from '@nestjs/common';
import { IPaginateResponse } from 'apps/backoffice/src/common/interface/index.interface';
import { Order } from 'entities/order/order.entity';
import { IOrder } from 'interface-models/order/order.interface';
import { OrderRepository } from '../repositories/order.repository';
import { OrderCreateRequest } from '../requests/order/order-create.request';
import { OrderIndexRequest } from '../requests/order/order-index.request';
import { OrderItem } from 'entities/order/order-item.entity';
import { MovieScheduleRepository } from '../../cinema/repositories/movie-schedule.repository';
import { OrderItemRepository } from '../repositories/order-item.repository';
import { UserRepository } from '../../iam/repositories/user.repository';

@Injectable()
export class OrderService {
    constructor(
        private readonly orderRepository: OrderRepository,
        private readonly movieScheduleRepository: MovieScheduleRepository,
        private readonly orderItemRepository: OrderItemRepository,
        private readonly userRepository: UserRepository,
    ) {}

    async pagination(
        request: OrderIndexRequest,
    ): Promise<IPaginateResponse<IOrder>> {
        return this.orderRepository.pagination(request);
    }

    async findOneById(id: number): Promise<IOrder> {
        return await this.orderRepository.findOneOrFail({
            where: { id },
            relations: [
                'orderItems',
                'orderItems.movieSchedule',
                'user',
                'orderItems.movieSchedule.movie',
                'orderItems.movieSchedule.studio',
            ],
        });
    }

    async create(data: OrderCreateRequest, userId: number): Promise<void> {
        const user = await this.userRepository.findOneOrFail({
            where: { id: userId },
        });

        const orderItems: OrderItem[] = [];

        if (data.orderItems?.length > 0) {
            for (const orderItem of data.orderItems) {
                const snapshotsUrl: string[] = [];
                if (orderItem.snapshots) {
                    for (const snapshot of orderItem.snapshots) {
                        snapshotsUrl.push(snapshot);
                    }
                }

                const movieSchedule =
                    await this.movieScheduleRepository.findOneOrFail({
                        where: { id: orderItem.movieScheduleId },
                    });

                const newOrderItem = new OrderItem();
                newOrderItem.qty = orderItem.qty;
                newOrderItem.price = orderItem.price;
                newOrderItem.subTotalPrice = orderItem.qty * orderItem.price;
                newOrderItem.snapshots = snapshotsUrl;
                newOrderItem.movieSchedule = movieSchedule;

                orderItems.push(newOrderItem);

                await this.orderItemRepository.save(newOrderItem);
            }
        }

        const newOrder = new Order();
        newOrder.paymentMethod = data.paymentMethod;
        newOrder.totalItemPrice = orderItems.reduce(
            (acc, cur) => acc + cur.subTotalPrice,
            0,
        );
        newOrder.user = user;
        newOrder.orderItems = orderItems;

        await this.orderRepository.save(newOrder);
    }

    async delete(id: number): Promise<void> {
        await this.orderRepository.delete(id);
    }

    async bulkDelete(ids: number[]): Promise<void> {
        await this.orderRepository.bulkDelete(ids);
    }

    async update(
        id: number,
        data: OrderCreateRequest,
        userId: number,
    ): Promise<void> {
        const user = await this.userRepository.findOneOrFail({
            where: { id: userId },
        });

        const orderItems: OrderItem[] = [];

        if (data.orderItems?.length > 0) {
            for (const orderItem of data.orderItems) {
                const snapshotsUrl: string[] = [];
                if (orderItem.snapshots) {
                    for (const snapshot of orderItem.snapshots) {
                        snapshotsUrl.push(snapshot);
                    }
                }

                const movieSchedule =
                    await this.movieScheduleRepository.findOneOrFail({
                        where: { id: orderItem.movieScheduleId },
                    });

                const newOrderItem = new OrderItem();
                newOrderItem.qty = orderItem.qty;
                newOrderItem.price = orderItem.price;
                newOrderItem.subTotalPrice = orderItem.qty * orderItem.price;
                newOrderItem.snapshots = snapshotsUrl;
                newOrderItem.movieSchedule = movieSchedule;

                orderItems.push(newOrderItem);

                await this.orderItemRepository.save(newOrderItem);
            }
        }

        const order = await this.orderRepository.findOneOrFail({
            where: { id },
        });

        order.paymentMethod = data.paymentMethod;
        order.totalItemPrice = orderItems.reduce(
            (acc, cur) => acc + cur.subTotalPrice,
            0,
        );

        order.user = user;
        order.orderItems = orderItems;

        await this.orderRepository.save(order);
    }
}
