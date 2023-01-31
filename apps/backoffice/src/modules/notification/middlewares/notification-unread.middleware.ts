import { Injectable, NestMiddleware } from '@nestjs/common';
import { InertiaAdapter } from 'apps/backoffice/src/infrastructure/inertia/adapter/inertia.adapter';
import { Request, Response } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { InAppNotification } from 'entities/notification/in-app-notification.entity';
import { Repository } from 'typeorm';
import { IUser } from 'interface-models/iam/user.interface';

@Injectable()
export class NotificationUnreadMiddleware implements NestMiddleware {
    constructor(
        private readonly inertiaAdapter: InertiaAdapter,
        @InjectRepository(InAppNotification)
        private readonly NotificationRepository: Repository<InAppNotification>,
    ) {}

    async use(req: Request, res: Response, next: () => void): Promise<void> {
        const user = req.user as IUser;
        const notificationUnread =
            await this.NotificationRepository.createQueryBuilder('notification')
                .leftJoinAndSelect('notification.targetUser', 'targetUser')
                .andWhere('targetUser.id = :userId', { userId: user.id })
                .getCount();

        this.inertiaAdapter.share({
            notifications:
                {
                    notificationUnread: notificationUnread,
                } || 0,
        });

        next();
    }
}
