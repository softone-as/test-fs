import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LogActivityDto } from 'entities/log-activity/dto/log-activity.dto';
import { LogActivity } from 'entities/log-activity/log-activity.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LogActivityService {
    constructor(
        @InjectRepository(LogActivity)
        private logActivityRepo: Repository<LogActivity>,
    ) {}

    create(logActivityDto: LogActivityDto) {
        this.logActivityRepo.save(logActivityDto);
    }
}
