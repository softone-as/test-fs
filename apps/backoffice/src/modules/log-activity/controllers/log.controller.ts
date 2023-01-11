import { Controller, Get, Inject, LoggerService } from '@nestjs/common';
import {
    LogActivityMethodEnum,
    LogActivityMenuEnum,
    LogActivityStatusEnum,
} from '../../../common/enums/log-activity.enum';
import { LogActivityService } from '../services/log-activity.service';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { LogActivityDto } from 'entities/log-activity/dto/log-activity.dto';

@Controller('log')
export class LogController {
    constructor(
        private readonly logActivityService: LogActivityService,
        @Inject(WINSTON_MODULE_NEST_PROVIDER)
        private readonly logger: LoggerService,
    ) {}

    // example store logActivity
    @Get()
    create() {
        const logActivity: LogActivityDto = {
            functionName: this.create.name,
            method: LogActivityMethodEnum.DELETE,
            menu: LogActivityMenuEnum.USER,
            status: LogActivityStatusEnum.SUCCESS,
            data: '',
            description: '',
            path: __filename,
            user: null,
        };
        this.logActivityService.create(logActivity);

        this.logger.log('asssss');
    }
}
