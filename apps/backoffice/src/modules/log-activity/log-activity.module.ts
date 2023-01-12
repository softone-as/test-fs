import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogActivity } from 'entities/log-activity/log-activity.entity';
import { LogActivityService } from './services/log-activity.service';

@Module({
    imports: [TypeOrmModule.forFeature([LogActivity])],
    controllers: [],
    providers: [LogActivityService],
    exports: [LogActivityService],
})
export class LogActivityModule {}
