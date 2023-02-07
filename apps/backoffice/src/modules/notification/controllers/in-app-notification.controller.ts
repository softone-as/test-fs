import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { InertiaAdapter } from 'apps/backoffice/src/infrastructure/inertia/adapter/inertia.adapter';
import { IUser } from 'interface-models/iam/user.interface';
import { LoggedInGuard } from '../../auth/guards/logged-in.guard';
import { GetUserLogged } from '../../iam/decorators/get-user.decorator';
import { InAppNotificationIndexApplication } from '../applications/in-app-notification-index.application';
import { InAppNotificationIndexRequest } from '../requests/in-app-notification-index.request';

@Controller('notifications')
@UseGuards(LoggedInGuard)
export class InAppNotificationController {
    constructor(
        private readonly inAppNotificationIndexApplication: InAppNotificationIndexApplication,
        private readonly inertiaAdapter: InertiaAdapter,
    ) {}

    @Get()
    async fetch(
        @Query() indexRequest: InAppNotificationIndexRequest,
        @GetUserLogged() user: IUser,
    ): Promise<void> {
        const response = await this.inAppNotificationIndexApplication.fetch(
            indexRequest,
            user,
        );

        return this.inertiaAdapter.render({
            component: 'Dummy',
            props: {
                title: 'Notifications',
                ...response,
            },
        });
    }
}
