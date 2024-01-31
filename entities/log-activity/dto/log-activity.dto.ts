import { LogActivityMenuEnum } from 'apps/backoffice/src/common/enums/log-activity.enum';
import { IsNotEmpty } from 'class-validator';
import { User } from 'entities/iam/user.entity';

export class LogActivityDto {
    @IsNotEmpty()
    user: User | null;

    @IsNotEmpty()
    path: string;

    metaData: any;

    source: string;

    activity: string;

    @IsNotEmpty()
    menu: LogActivityMenuEnum;
}
