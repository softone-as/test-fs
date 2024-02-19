import { LogActivity } from 'entities/log-activity/log-activity.entity';
import { OmitType } from '@nestjs/swagger';
import { ILogActivity } from 'interface-models/log-activity/log-activity.interface';
import { TCUserDetailProps } from 'apps/backoffice/@contracts/iam/user/user-detail.contract';
import { TCLogActivityDetailProps } from 'apps/backoffice/@contracts/log-activity/log-activity-detail.contract';

export class LogActivityResponse extends OmitType(LogActivity, ['user']) {
    user: TCUserDetailProps['data'] | null;

    public static fromEntity = (
        logActivity: ILogActivity,
    ): TCLogActivityDetailProps['data'] => ({
        id: logActivity.id,
        user: logActivity.user,
        metaData: logActivity?.metaData,
        source: logActivity?.source,
        activity: logActivity?.activity,
        menu: logActivity?.menu,
        path: logActivity?.path,
        createdAt: logActivity?.createdAt,
    });

    static fromEntities(
        data: ILogActivity[],
    ): TCLogActivityDetailProps['data'][] {
        return data.map((data) => this.fromEntity(data));
    }
}
