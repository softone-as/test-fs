import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItem } from 'entities/order/order-item.entity';
import { PaginateUtil } from '../../common/utils/paginate.util';

import { InertiaAdapter } from '../../infrastructure/inertia/adapter/inertia.adapter';
import { OrderItemController } from './controllers/order-item.controller';
import { OrderItemRepository } from './repositories/order-item.repository';
import { OrderItemService } from './services/order-item.service';
import { Order } from 'entities/order/order.entity';
import { OrderService } from './services/order.service';
import { OrderRepository } from './repositories/order.repository';
import { MovieScheduleRepository } from '../cinema/repositories/movie-schedule.repository';
import { User } from 'entities/iam/user.entity';
import { UserRepository } from '../iam/repositories/user.repository';
import { LdapService } from '../auth/services/ldap.service';
import { OrderController } from './controllers/order.controller';
import { MovieScheduleService } from '../cinema/services/movie-schedule.service';
import { MovieSchedule } from 'entities/movie/movie-schedule.entity';
import { MovieService } from '../cinema/services/movie.service';
import { StudioService } from '../cinema/services/studio.service';
import { BullModule } from '@nestjs/bull';
import { QUEUE_MOVIE } from '../cinema/queues/movie-queue.constants';
import { Movie } from 'entities/movie/movie.entity';
import { Studio } from 'entities/movie/studio.entity';
import { MovieRepository } from '../cinema/repositories/movie.repository';
import { StudioRepository } from '../cinema/repositories/studio.repository';
import { TagRepository } from '../cinema/repositories/tag.repository';
import { TagService } from '../cinema/services/tag.service';
import { Tag } from 'entities/movie/tag.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Order,
            OrderItem,
            User,
            MovieSchedule,
            Movie,
            Studio,
            Tag,
        ]),
        HttpModule,
        BullModule.registerQueue({
            name: QUEUE_MOVIE,
        }),
    ],
    controllers: [OrderController, OrderItemController],
    providers: [
        InertiaAdapter,
        PaginateUtil,

        LdapService,
        UserRepository,

        MovieScheduleRepository,
        MovieScheduleService,

        MovieRepository,
        MovieService,

        TagRepository,
        TagService,

        StudioRepository,
        StudioService,

        OrderService,
        OrderRepository,

        OrderItemService,
        OrderItemRepository,
    ],
    exports: [TypeOrmModule, PaginateUtil],
})
export class OrderModule {}
