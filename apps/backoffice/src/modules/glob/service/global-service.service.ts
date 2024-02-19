import { LogActivity } from 'entities/log-activity/log-activity.entity';
import { ILogActivity } from 'interface-models/log-activity/log-activity.interface';
import { getManager } from 'typeorm';

export class GlobalService {
    static createLogActivity(data: ILogActivity): void {
        this.prototype.createLogActivity(data);
    }

    async createLogActivity(logActivity: ILogActivity): Promise<void> {
        const repository = getManager().getRepository(LogActivity);
        await repository
            .createQueryBuilder()
            .insert()
            .into(LogActivity)
            .values({
                user: logActivity.user,
                source: logActivity.source,
                activity: logActivity.activity,
                menu: logActivity.menu,
                path: logActivity.path,
                metaData: logActivity.metaData,
            })
            .execute();
    }
}
