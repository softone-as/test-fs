import { OmitType } from '@nestjs/swagger';
import { UserMapper } from '../../iam/mappers/user.mapper';
import { LogActivity } from '../../../../../../entities/log-activity/log-activity.entity';
import { UserResponse } from '../../iam/responses/user.response';
import { ILogActivity } from '../../../../../../interface-models/log-activity/log-activity.interface';

export class LogActivityResponse extends OmitType(LogActivity, ['user']) {
    user: UserResponse | null;

    static fromEntity(entity: ILogActivity): LogActivityResponse {
        const response = new LogActivityResponse();

        response.id = entity.id;
        response.user = entity.user && UserMapper.fromEntity(entity.user);
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
