import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    UploadedFiles,
    UseInterceptors,
} from '@nestjs/common';
import { InertiaAdapter } from 'apps/backoffice/src/infrastructure/inertia/adapter/inertia.adapter';

import { FilesInterceptor } from '@nestjs/platform-express';
import { TCOrderItemFormProps } from 'apps/backoffice/@contracts/order/order-item/order-item-create.contract';
import { TCOrderItemDetailProps } from 'apps/backoffice/@contracts/order/order-item/order-item-detail.contract';
import { TCOrderItemIndexProps } from 'apps/backoffice/@contracts/order/order-item/order-item-index.contract';
import { OrderItemCreateRequest } from '../requests/order-item/order-item-create.request';
import { OrderItemEditRequest } from '../requests/order-item/order-item-edit.request';
import { OrderItemIndexRequest } from '../requests/order-item/order-item-index.request';
import { OrderItemResponse } from '../responses/order-item.response';
import { OrderItemService } from '../services/order-item.service';
import { Utils } from 'apps/backoffice/src/common/utils/util';

@Controller('order-items')
export class OrderItemController {
    constructor(
        private readonly inertiaAdapter: InertiaAdapter,
        private readonly orderItemService: OrderItemService,
    ) {}

    @Get()
    async indexPage(
        @Query() indexRequest: OrderItemIndexRequest,
    ): Promise<TCOrderItemIndexProps> {
        const orderItemResponse = await this.orderItemService.pagination(
            indexRequest,
        );

        return this.inertiaAdapter.render('OrderItem', {
            data: OrderItemResponse.fromEntities(orderItemResponse.data),
            meta: orderItemResponse.meta,
        });
    }

    @Get('create')
    async createPage(): Promise<TCOrderItemFormProps> {
        return this.inertiaAdapter.render('OrderItem/Form', {});
    }

    @Get(':id')
    async detailPage(@Param('id') id: number): Promise<TCOrderItemDetailProps> {
        const data = await this.orderItemService.findOneById(id);

        return this.inertiaAdapter.render('OrderItem/Detail', {
            data: OrderItemResponse.fromEntity(data),
        });
    }

    @Get('edit/:id')
    async getEditPage(@Param('id') id: number): Promise<TCOrderItemFormProps> {
        const orderItemResponse = await this.orderItemService.findOneById(id);

        return this.inertiaAdapter.render('OrderItem/Form', {
            id,
            data: OrderItemResponse.fromEntity(orderItemResponse),
            isUpdate: true,
        });
    }

    @Post('create')
    @UseInterceptors(
        FilesInterceptor('snapshots', 5, {
            ...Utils.getStorageMulterConfig('multiple'),
        }),
    )
    async create(
        @Body() data: OrderItemCreateRequest,
        @UploadedFiles() snapshots: Express.Multer.File[],
    ): Promise<void> {
        await this.orderItemService.create(data, snapshots);
        this.inertiaAdapter.successResponse(
            'order-items',
            'Movie Created Successfully',
        );
    }

    @Put('edit/:id')
    @UseInterceptors(
        FilesInterceptor('snapshots', 5, {
            ...Utils.getStorageMulterConfig('multiple'),
        }),
    )
    async update(
        @Param('id') id: number,
        @Body() data: OrderItemEditRequest,
        @UploadedFiles() snapshots: Express.Multer.File[],
    ): Promise<void> {
        await this.orderItemService.update(id, data, snapshots);
        this.inertiaAdapter.successResponse('order-items', 'Success update');
    }

    @Delete('delete/:id')
    async delete(@Param('id') id: number): Promise<void> {
        await this.orderItemService.delete(id);
        this.inertiaAdapter.successResponse('order-items', 'Success delete');
    }
    @Post('bulk-delete')
    async bulkDelete(@Body('ids') ids: number[]): Promise<void> {
        await this.orderItemService.bulkDelete(ids);
        this.inertiaAdapter.successResponse(
            'order-items',
            'Success bulk delete',
        );
    }
}
