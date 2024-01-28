import { CacheModule } from './../../infrastructure/cache/cache.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InAppNotification } from 'entities/notification/in-app-notification.entity';
import { InAppNotificationIndexApplication } from './applications/in-app-notification-index.application';
import { InAppNotificationController } from './controllers/in-app-notification.controller';
import { InAppNotificationService } from './services/in-app-notification.service';
import { InertiaAdapter } from '../../infrastructure/inertia/adapter/inertia.adapter';
import { NotificationRepository } from './repositories/notification.repository';
import { PaginateUtil } from '../../common/utils/paginate.util';

@Module({
    imports: [TypeOrmModule.forFeature([InAppNotification]), CacheModule],
    controllers: [InAppNotificationController],
    providers: [
        InertiaAdapter,
        InAppNotificationService,
        InAppNotificationIndexApplication,
        NotificationRepository,
        PaginateUtil,
    ],
    exports: [InAppNotificationIndexApplication, InAppNotificationService],
})
export class InAppNotificationModule {}
