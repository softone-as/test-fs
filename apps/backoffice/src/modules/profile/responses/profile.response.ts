import { OmitType } from '@nestjs/swagger';
import { User } from 'entities/iam/user.entity';
import { IUser } from 'interface-models/iam/user.interface';
import dayjs from 'dayjs';

export class ProfileResponse extends OmitType(User, ['password', 'birthDate']) {
    birthDate: dayjs.Dayjs;

    static fromEntity(entity: IUser): ProfileResponse {
        const response = new ProfileResponse();

        response.id = entity.id;
        response.roles = entity.roles;
        response.fullname = entity.fullname;
        response.email = entity.email;
        response.identityNumber = entity.identityNumber;
        response.phoneNumber = entity.phoneNumber;
        response.oneSignalPlayerIds = entity.oneSignalPlayerIds;
        response.emailVerifiedAt = entity.emailVerifiedAt;
        response.phoneNumberVerifiedAt = entity.phoneNumberVerifiedAt;
        response.gender = entity.gender;
        response.birthDate = dayjs(entity.birthDate);

        return response;
    }
}
