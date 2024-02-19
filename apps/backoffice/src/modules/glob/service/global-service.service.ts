import { LogActivity } from 'entities/log-activity/log-activity.entity';
import { getManager } from 'typeorm';
import { LogActivityCreateRequest } from '../../log-activity/requests/log-activity-create.request';

export class GlobalService {
    static createLogActivity(data: LogActivityCreateRequest): void {
        this.prototype.createLogActivity(data);
    }

    async createLogActivity(request: LogActivityCreateRequest): Promise<void> {
        const repository = getManager().getRepository(LogActivity);
        await repository
            .createQueryBuilder()
            .insert()
            .into(LogActivity)
            .values({
                userId: request.userId ?? null,
                source: request.source,
                activity: request.activity,
                menu: request.menu,
                path: request.path,
                metaData: request.metaData,
            })
            .execute();
    }
}
