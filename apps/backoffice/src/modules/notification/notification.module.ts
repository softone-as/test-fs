import { CacheModule } from './../../infrastructure/cache/cache.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InAppNotification } from 'entities/notification/in-app-notification.entity';
import { InAppNotificationIndexApplication } from './applications/in-app-notification-index.application';
import { InAppNotificationController } from './controllers/in-app-notification.controller';
import { InAppNotificationService } from './services/in-app-notifiacation.service';
import { InertiaAdapter } from '../../infrastructure/inertia/adapter/inertia.adapter';

@Module({
    imports: [TypeOrmModule.forFeature([InAppNotification]), CacheModule],
    controllers: [InAppNotificationController],
    providers: [
        InertiaAdapter,
        InAppNotificationService,
        InAppNotificationIndexApplication,
    ],
    exports: [InAppNotificationIndexApplication],
})
export class InAppNotificationModule {}
