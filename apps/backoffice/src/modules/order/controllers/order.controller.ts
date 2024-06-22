import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    UseInterceptors,
} from '@nestjs/common';
import { InertiaAdapter } from 'apps/backoffice/src/infrastructure/inertia/adapter/inertia.adapter';

import { FilesInterceptor } from '@nestjs/platform-express';
import { TCOrderFormProps } from 'apps/backoffice/@contracts/order/order/order-create.contract';
import { TCOrderDetailProps } from 'apps/backoffice/@contracts/order/order/order-detail.contract';
import { OrderCreateRequest } from '../requests/order/order-create.request';
import { OrderEditRequest } from '../requests/order/order-edit.request';
import { OrderIndexRequest } from '../requests/order/order-index.request';
import { OrderResponse } from '../responses/order.response';
import { OrderService } from '../services/order.service';
import { Utils } from 'apps/backoffice/src/common/utils/util';
import { IUser } from 'interface-models/iam/user.interface';
import { GetUserLogged } from '../../iam/decorators/get-user.decorator';
import { PAYMENT_METHODS_OPTIONS } from 'apps/backoffice/src/common/constant/option.constant';
import { TCOrderIndexProps } from 'apps/backoffice/@contracts/order/order/order-index.contract';
import { MovieScheduleService } from '../../cinema/services/movie-schedule.service';
import { formatDate } from 'apps/backoffice/app/Utils/utils';

@Controller('orders')
export class OrderController {
    constructor(
        private readonly inertiaAdapter: InertiaAdapter,
        private readonly orderService: OrderService,
        private readonly movieScheduleService: MovieScheduleService,
    ) {}

    @Get()
    async indexPage(
        @Query() indexRequest: OrderIndexRequest,
    ): Promise<TCOrderIndexProps> {
        const orderResponse = await this.orderService.pagination(indexRequest);

        return this.inertiaAdapter.render('Order', {
            data: OrderResponse.fromEntities(orderResponse.data),
            meta: orderResponse.meta,
            paymentMethods: PAYMENT_METHODS_OPTIONS,
        });
    }

    @Get('create')
    async createPage(): Promise<TCOrderFormProps> {
        const movieSchedules = await this.movieScheduleService.findAll();

        const movieSchedulesOption = movieSchedules.map((movieSchedule) => ({
            label: `${movieSchedule.studio.studioNumber} - ${
                movieSchedule.movie.title
            } - ${formatDate(movieSchedule.date, 'dd MMM yyyy')} (${formatDate(
                movieSchedule.startTime,
                'HH:mm',
            )} - ${formatDate(movieSchedule.endTime, 'HH:mm')})`,
            value: movieSchedule.id as number,
        }));

        return this.inertiaAdapter.render('Order/Form', {
            paymentMethods: PAYMENT_METHODS_OPTIONS,
            movieSchedules: movieSchedulesOption,
        });
    }

    @Get(':id')
    async detailPage(@Param('id') id: number): Promise<TCOrderDetailProps> {
        const data = await this.orderService.findOneById(id);

        return this.inertiaAdapter.render('Order/Detail', {
            data: OrderResponse.fromEntity(data),
        });
    }

    @Get('edit/:id')
    async getEditPage(@Param('id') id: number): Promise<TCOrderFormProps> {
        const [orderResponse, movieSchedules] = await Promise.all([
            this.orderService.findOneById(id),
            this.movieScheduleService.findAll(),
        ]);

        const movieSchedulesOption = movieSchedules.map((movieSchedule) => ({
            label: `${movieSchedule.studio.studioNumber} - ${movieSchedule.movie.title} - ${movieSchedule.date} (${movieSchedule.startTime} - ${movieSchedule.endTime})`,
            value: movieSchedule.id as number,
        }));

        return this.inertiaAdapter.render('Order/Form', {
            id,
            data: OrderResponse.fromEntity(orderResponse),
            isUpdate: true,
            paymentMethods: PAYMENT_METHODS_OPTIONS,
            movieSchedules: movieSchedulesOption,
        });
    }

    @Post('create')
    async create(
        @Body() data: OrderCreateRequest,
        @GetUserLogged() user: IUser,
    ): Promise<void> {
        await this.orderService.create(data, user.id);
        this.inertiaAdapter.successResponse(
            'orders',
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
        @Body() data: OrderEditRequest,
        @GetUserLogged() user: IUser,
    ): Promise<void> {
        await this.orderService.update(id, data, user.id);
        this.inertiaAdapter.successResponse('orders', 'Success update');
    }

    @Delete('delete/:id')
    async delete(@Param('id') id: number): Promise<void> {
        await this.orderService.delete(id);
        this.inertiaAdapter.successResponse('orders', 'Success delete');
    }
    @Post('bulk-delete')
    async bulkDelete(@Body('ids') ids: number[]): Promise<void> {
        await this.orderService.bulkDelete(ids);
        this.inertiaAdapter.successResponse('orders', 'Success bulk delete');
    }
}
