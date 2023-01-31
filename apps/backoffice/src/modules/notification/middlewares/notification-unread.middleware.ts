import { IndexRequest } from 'apps/api/src/common/request/index.request';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { InertiaAdapter } from 'apps/backoffice/src/infrastructure/inertia/adapter/inertia.adapter';
import { Request, Response } from 'express';
import { InAppNotificationIndexApplication } from '../../notification/applications/in-app-notification-index.application';
import { IUser } from 'interface-models/iam/user.interface';

@Injectable()
export class NotificationUnreadMiddleware implements NestMiddleware {
    constructor(
        private readonly inertiaAdapter: InertiaAdapter,
        private readonly inAppNotificationIndexApplication: InAppNotificationIndexApplication,
    ) {}

    async use(req: Request, res: Response, next: () => void): Promise<void> {
        const response = await this.inAppNotificationIndexApplication.fetch(
            new IndexRequest(),
            req.user as IUser,
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

        next();
    }
}
