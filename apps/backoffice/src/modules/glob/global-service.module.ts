import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogActivity } from 'entities/log-activity/log-activity.entity';
import { GlobalService } from './service/global-service.service';

@Module({
    imports: [TypeOrmModule.forFeature([LogActivity])],
    controllers: [],
    providers: [GlobalService],
    exports: [GlobalService],
})
export class GlobalServiceModule {}
