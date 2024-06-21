import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginateResponse } from 'apps/backoffice/src/common/interface/index.interface';
import { PaginateUtil } from 'apps/backoffice/src/common/utils/paginate.util';
import { OrderItem } from 'entities/order/order-item.entity';
import { IOrderItem } from 'interface-models/order/order-item.interface';
import { Repository } from 'typeorm';
import { OrderItemIndexRequest } from '../requests/order-item-index.request';

@Injectable()
export class OrderItemRepository extends Repository<OrderItem> {
    constructor(
        @InjectRepository(OrderItem)
        private readonly orderItemRepository: Repository<OrderItem>,
        private readonly paginationUtil: PaginateUtil,
    ) {
        super(
            orderItemRepository.target,
            orderItemRepository.manager,
            orderItemRepository.queryRunner,
        );
    }

    async pagination(
        request: OrderItemIndexRequest,
    ): Promise<IPaginateResponse<IOrderItem>> {
        const ALLOW_TO_SORT = ['latest', 'oldest', 'menu'];
        const query = this.orderItemRepository.createQueryBuilder('orderItem');

        if (request.search) {
            query.andWhere(
                `concat(orderItem.price, ' ', orderItem.subTotalPrice, ' ', orderItem.id) like :search`,
                {
                    search: `%${request.search}%`,
                },
            );
        }

        if (request.sort == 'latest') {
            query.orderBy('createdAt', 'DESC');
        } else if (request.sort == 'oldest') {
            query.orderBy('createdAt', 'ASC');
        } else {
            query.orderBy(
                ALLOW_TO_SORT.includes(request.sort)
                    ? `orderItem.${request.sort}`
                    : `orderItem.createdAt`,
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
        await this.orderItemRepository.delete(ids);
    }
}
