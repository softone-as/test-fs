import { Module } from '@nestjs/common';
import { GlobalService } from './service/global-service.service';
import { LogActivityModule } from '../log-activity/log-activity.module';

@Module({
    imports: [LogActivityModule],
    controllers: [],
    providers: [GlobalService],
    exports: [GlobalService],
})
export class GlobalServiceModule {}
