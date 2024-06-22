import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginateResponse } from 'apps/backoffice/src/common/interface/index.interface';
import { PaginateUtil } from 'apps/backoffice/src/common/utils/paginate.util';
import { Order } from 'entities/order/order.entity';
import { IOrder } from 'interface-models/order/order.interface';
import { Repository } from 'typeorm';
import { OrderIndexRequest } from '../requests/order/order-index.request';

@Injectable()
export class OrderRepository extends Repository<Order> {
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
        private readonly paginationUtil: PaginateUtil,
    ) {
        super(
            orderRepository.target,
            orderRepository.manager,
            orderRepository.queryRunner,
        );
    }

    async pagination(
        request: OrderIndexRequest,
    ): Promise<IPaginateResponse<IOrder>> {
        const ALLOW_TO_SORT = ['latest', 'oldest', 'menu'];
        const query = this.orderRepository
            .createQueryBuilder('order')
            .leftJoinAndSelect('order.user', 'user')
            .leftJoinAndSelect('order.orderItems', 'orderItems')
            .leftJoinAndSelect('orderItems.movieSchedule', 'movieSchedule')
            .leftJoinAndSelect('movieSchedule.movie', 'movie');

        if (request.search) {
            query.andWhere(
                `concat(order.price, ' ', order.subTotalPrice, ' ', order.id) like :search`,
                {
                    search: `%${request.search}%`,
                },
            );
        }

        if (request.paymentMethod) {
            query.andWhere('order.paymentMethod = :paymentMethod', {
                paymentMethod: request.paymentMethod,
            });
        }

        if (request.sort == 'latest') {
            query.orderBy('createdAt', 'DESC');
        } else if (request.sort == 'oldest') {
            query.orderBy('createdAt', 'ASC');
        } else {
            query.orderBy(
                ALLOW_TO_SORT.includes(request.sort)
                    ? `order.${request.sort}`
                    : `order.createdAt`,
                this.paginationUtil.getOrder(request.order),
            );
        }

        query.take(request.perPage ?? 10);
        query.skip(this.paginationUtil.countOffset(request));

        const [data, count] = await query.getManyAndCount();

        const meta = this.paginationUtil.mapMeta(count, request);

        const results = {
            data,
            meta,
        };

        return results;
    }

    async bulkDelete(ids: number[]): Promise<void> {
        await this.orderRepository.delete(ids);
    }
}
