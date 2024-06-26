import {
    Controller,
    Get,
    Param,
    Patch,
    Query,
    UseGuards,
} from '@nestjs/common';
import { InertiaAdapter } from 'apps/backoffice/src/infrastructure/inertia/adapter/inertia.adapter';
import { IUser } from 'interface-models/iam/user.interface';
import { LoggedInGuard } from '../../auth/guards/logged-in.guard';
import { GetUserLogged } from '../../iam/decorators/get-user.decorator';
import { InAppNotificationIndexRequest } from '../requests/in-app-notification-index.request';
import { InAppNotificationMarkReadRequest } from '../requests/in-app-notification-mark-read.request';
import { InAppNotificationService } from '../services/in-app-notification.service';
import { TCNotificationIndexProps } from 'apps/backoffice/@contracts/notification/notification-index.contract';
import { TCNotificationDetailProps } from 'apps/backoffice/@contracts/notification/notification-detail.contract';

@Controller('notifications')
@UseGuards(LoggedInGuard)
export class InAppNotificationController {
    constructor(
        private readonly inertiaAdapter: InertiaAdapter,
        private readonly inAppNotificationService: InAppNotificationService,
    ) {}

    @Get()
    async fetch(
        @Query() indexRequest: InAppNotificationIndexRequest,
        @GetUserLogged() user: IUser,
    ): Promise<TCNotificationIndexProps> {
        const response = await this.inAppNotificationService.pagination(
            indexRequest,
            user,
        );

        return this.inertiaAdapter.render('Notifications', {
            data: response.data,
            meta: response.meta,
        });
    }

    @Get(':id')
    async findOneAndMarkRead(
        @Param('id') id: number,
    ): Promise<TCNotificationDetailProps> {
        const dataMarkRead = new InAppNotificationMarkReadRequest();
        dataMarkRead.notificationIds = [id];
        await this.inAppNotificationService.readNotificationsByIds(
            dataMarkRead,
        );

        const data = await this.inAppNotificationService.findOneById(id);
        return this.inertiaAdapter.render('Notifications/DetailNotification', {
            data,
        });
    }

    @Patch('mark-read-all')
    async markReadAll(): Promise<void> {
        await this.inAppNotificationService.readAllNotification();
        this.inertiaAdapter.share('success');
        return this.inertiaAdapter.successResponse(
            '/notifications',
            'Sukses mark all',
        );
    }
}
