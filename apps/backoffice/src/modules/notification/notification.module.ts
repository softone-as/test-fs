import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InAppNotification } from 'entities/notification/in-app-notification.entity';
import { InAppNotificationService } from './services/in-app-notifiacation.service';

@Module({
    imports: [TypeOrmModule.forFeature([InAppNotification])],
    controllers: [],
    providers: [InAppNotificationService],
})
export class NotificationModule {}
