import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LogActivity } from 'entities/log-activity/log-activity.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LogActivityService {
    constructor(
        @InjectRepository(LogActivity)
        private logActivityRepo: Repository<LogActivity>,
    ) {}

    create(data: any) {
        this.logActivityRepo.save(data);
    }
}
