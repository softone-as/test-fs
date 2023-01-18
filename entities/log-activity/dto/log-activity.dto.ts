import { LogActivityMenuEnum } from 'apps/backoffice/src/common/enums/log-activity.enum';
import { IsNotEmpty } from 'class-validator';
import { User } from 'entities/iam/user.entity';

export class LogActivityDto {
    @IsNotEmpty()
    user: User;

    @IsNotEmpty()
    path: string;

    old_data: any;

    new_data: any;

    activity: string;

    @IsNotEmpty()
    menu: LogActivityMenuEnum;
}
