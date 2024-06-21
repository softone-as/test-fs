import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItem } from 'entities/order/order-item.entity';
import { PaginateUtil } from '../../common/utils/paginate.util';

import { InertiaAdapter } from '../../infrastructure/inertia/adapter/inertia.adapter';
import { OrderItemController } from './controllers/order-item.controller';
import { OrderItemRepository } from './repositories/order-item.repository';
import { OrderItemService } from './services/order-item.service';

@Module({
    imports: [TypeOrmModule.forFeature([OrderItem]), HttpModule],
    controllers: [OrderItemController],
    providers: [
        InertiaAdapter,
        PaginateUtil,

        OrderItemService,
        OrderItemRepository,
    ],
    exports: [TypeOrmModule, PaginateUtil],
})
export class OrderModule {}
