import { LogActivity } from 'entities/log-activity/log-activity.entity';
import { OmitType } from '@nestjs/swagger';
import { ILogActivity } from 'interface-models/log-activity/log-activity.interface';
import { UserResponse } from '../../iam/responses/user.response';
import { TCUserDetailProps } from 'apps/backoffice/@contracts/iam/user/user-detail.contract';

export class LogActivityResponse extends OmitType(LogActivity, ['user']) {
    user: TCUserDetailProps['data'] | null;

    static fromEntity(entity: ILogActivity): LogActivityResponse {
        const response = new LogActivityResponse();

        response.id = entity.id;
        response.user = entity.user && UserResponse.fromEntity(entity.user);
        response.metaData = entity?.metaData;
        response.source = entity?.source;
        response.activity = entity?.activity;
        response.menu = entity?.menu;
        response.path = entity?.path;
        response.createdAt = entity?.createdAt;

        return response;
    }

    static fromEntities(data: ILogActivity[]): LogActivityResponse[] {
        return data.map((data) => this.fromEntity(data));
    }
}
