import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginateResponse } from 'apps/backoffice/src/common/interface/index.interface';
import { IndexApplication } from 'apps/backoffice/src/infrastructure/applications/index.application';
import { Repository } from 'typeorm';
import { InAppNotificationIndexRequest } from '../requests/in-app-notification-index.request';
import { IInAppNotification } from 'interface-models/notification/in-app-notification.interface';
import { InAppNotification } from 'entities/notification/in-app-notification.entity';

const ALLOW_TO_SORT = ['latest', 'oldest', 'title'];

@Injectable()
export class InAppNotificationIndexApplication extends IndexApplication {
    constructor(
        @InjectRepository(InAppNotification)
        private readonly NotificationRepository: Repository<InAppNotification>,
    ) {
        super();
    }

    // @CacheGetSet(config.cache.name.notification.list)
    async fetch(
        request: InAppNotificationIndexRequest,
    ): Promise<IPaginateResponse<IInAppNotification>> {
        const query =
            this.NotificationRepository.createQueryBuilder('notification');

        if (request.search) {
            query.where(
                `concat(notification.title, ' ', notification.message, ' ', notification.id) like :search`,
                {
                    search: `%${request.search}%`,
                },
            );
        }

        if (request.sort == 'latest') {
            query.orderBy('notification.createdAt', 'DESC');
        } else if (request.sort == 'oldest') {
            query.orderBy('notification.createdAt', 'ASC');
        } else {
            query.orderBy(
                ALLOW_TO_SORT.indexOf(request.sort) >= 0
                    ? request.sort
                        ? `notification.${request.sort}`
                        : `notification.${ALLOW_TO_SORT[0]}`
                    : `notification.createdAt`,
                this.getOrder(request.order),
            );
        }

        query.take(request.perPage ?? 10);
        query.skip(this.countOffset(request));

        const [data, count] = await query.getManyAndCount();

        const meta = this.mapMeta(count, request);

        const results = {
            data,
            meta,
        };

        return results;
    }
}
