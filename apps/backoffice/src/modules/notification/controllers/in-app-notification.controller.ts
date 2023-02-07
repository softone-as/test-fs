import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { IPaginateResponse } from 'apps/backoffice/src/common/interface/index.interface';
import { IUser } from 'interface-models/iam/user.interface';
import { IInAppNotification } from 'interface-models/notification/in-app-notification.interface';
import { LoggedInGuard } from '../../auth/guards/logged-in.guard';
import { GetUserLogged } from '../../iam/decorators/get-user.decorator';
import { InAppNotificationIndexApplication } from '../applications/in-app-notification-index.application';
import { InAppNotificationIndexRequest } from '../requests/in-app-notification-index.request';

@Controller('notifications')
@UseGuards(LoggedInGuard)
export class InAppNotificationController {
    constructor(
        private readonly inAppNotificationIndexApplication: InAppNotificationIndexApplication,
    ) {}

    @Get()
    async fetch(
        @Query() indexRequest: InAppNotificationIndexRequest,
        @GetUserLogged() user: IUser,
    ): Promise<IPaginateResponse<IInAppNotification>> {
        const response = await this.inAppNotificationIndexApplication.fetch(
            indexRequest,
            user,
        );

        return {
            data: response.data,
            meta: response.meta,
        };
    }
}
