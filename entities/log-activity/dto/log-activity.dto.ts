import {
    LogActivityMethodEnum,
    LogActivityStatusEnum,
    LogActivityMenuEnum,
} from 'apps/backoffice/src/common/enums/log-activity.enum';
import { IsNotEmpty } from 'class-validator';
import { User } from 'entities/iam/user.entity';

export class LogActivityDto {
    @IsNotEmpty()
    user: User;

    @IsNotEmpty()
    functionName: string;

    @IsNotEmpty()
    path: string;

    @IsNotEmpty()
    method: LogActivityMethodEnum;

    // digunakan ketika ada perubahan data, new dan old data disimpan dalam bentuk json
    data: string;

    description: string;

    @IsNotEmpty()
    status: LogActivityStatusEnum;

    @IsNotEmpty()
    menu: LogActivityMenuEnum;
}
