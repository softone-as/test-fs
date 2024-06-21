import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { IPaginateResponse } from 'apps/backoffice/src/common/interface/index.interface';
import { Utils } from 'apps/backoffice/src/common/utils/util';
import { OrderItem } from 'entities/order/order-item.entity';
import { IOrderItem } from 'interface-models/order/order-item.interface';
import { OrderItemRepository } from '../repositories/order-item.repository';
import { OrderItemCreateRequest } from '../requests/order-item-create.request';
import { OrderItemEditRequest } from '../requests/order-item-edit.request';
import { OrderItemIndexRequest } from '../requests/order-item-index.request';

@Injectable()
export class OrderItemService {
    constructor(private readonly orderItemRepository: OrderItemRepository) {}

    async pagination(
        request: OrderItemIndexRequest,
    ): Promise<IPaginateResponse<IOrderItem>> {
        return this.orderItemRepository.pagination(request);
    }

    async findOneById(id: number): Promise<IOrderItem> {
        return await this.orderItemRepository.findOneOrFail({
            where: { id },
        });
    }

    async create(
        data: OrderItemCreateRequest,
        snapshots?: Express.Multer.File[],
    ): Promise<void> {
        const snapshotsUrl: string[] = [];
        if (snapshots) {
            for (const snapshot of snapshots) {
                const uploadUrl = await Utils.moveFile(
                    snapshot.path,
                    '/' + Date.now() + '-' + snapshot.originalname,
                );
                snapshotsUrl.push(uploadUrl);
            }
        }

        const newOrderItem = new OrderItem();
        newOrderItem.qty = data.qty;
        newOrderItem.price = data.price;
        newOrderItem.subTotalPrice = data.subTotalPrice;
        newOrderItem.snapshots = snapshotsUrl;

        await this.orderItemRepository.save(newOrderItem);
    }

    async delete(id: number): Promise<void> {
        await this.orderItemRepository.delete(id);
    }

    async bulkDelete(ids: number[]): Promise<void> {
        await this.orderItemRepository.bulkDelete(ids);
    }

    async update(
        id: number,
        request: OrderItemEditRequest,
        snapshots: Express.Multer.File[],
    ): Promise<void> {
        const orderItem = await this.orderItemRepository.findOne({
            where: { id },
        });

        if (!orderItem) {
            throw new UnprocessableEntityException(
                `Order item: ${id} not found`,
            );
        }

        const snapshotsUrl: string[] = [];
        if (snapshots.length > 0) {
            for (const snapshot of snapshots) {
                const uploadUrl = await Utils.moveFile(
                    snapshot.path,
                    '/' + Date.now() + '-' + snapshot.originalname,
                );
                snapshotsUrl.push(uploadUrl);
            }
            orderItem.snapshots = snapshotsUrl;
        }

        orderItem.qty = request.qty;
        orderItem.price = request.price;
        orderItem.subTotalPrice = request.subTotalPrice;

        await this.orderItemRepository.save(orderItem);
    }
}
