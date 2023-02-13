import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LogActivity } from 'entities/log-activity/log-activity.entity';
import { ILogActivity } from 'interface-models/log-activity/log-activity.interface';
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

    async findOneById(id: number): Promise<ILogActivity> {
        return await this.logActivityRepo.findOneOrFail(id, {
            relations: ['user'],
        });
    }
}
