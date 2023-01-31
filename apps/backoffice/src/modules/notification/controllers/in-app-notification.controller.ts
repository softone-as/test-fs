import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { IPaginateResponse } from 'apps/backoffice/src/common/interface/index.interface';
import { InertiaAdapter } from 'apps/backoffice/src/infrastructure/inertia/adapter/inertia.adapter';
import { IInAppNotification } from 'interface-models/notification/in-app-notification.interface';
import { LoggedInGuard } from '../../auth/guards/logged-in.guard';
import { InAppNotificationIndexApplication } from '../applications/in-app-notification-index.application';
import { InAppNotificationIndexRequest } from '../requests/in-app-notification-index.request';

@Controller('notifications')
@UseGuards(LoggedInGuard)
export class InAppNotificationController {
    constructor(
        private readonly inertiaAdapter: InertiaAdapter,
        private readonly inAppNotificationIndexApplication: InAppNotificationIndexApplication,
    ) {}

    @Get()
    async fetch(
        @Query() indexRequest: InAppNotificationIndexRequest,
    ): Promise<IPaginateResponse<IInAppNotification>> {
        const response = await this.inAppNotificationIndexApplication.fetch(
            indexRequest,
        );

        const notificationUnread = response.data.filter((notification) => {
            return notification.isRead == false;
        });

        this.inertiaAdapter.share({
            notifications:
                {
                    notificationUnread: notificationUnread.length,
                } || 0,
        });

        return {
            data: response.data,
            meta: response.meta,
        };
    }
}
