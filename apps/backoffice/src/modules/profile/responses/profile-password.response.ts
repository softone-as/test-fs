import { PickType } from '@nestjs/swagger';
import { User } from 'entities/iam/user.entity';
import { IUser } from 'interface-models/iam/user.interface';

export class ProfilePasswordResponse extends PickType(User, [
    'id',
    'password',
]) {
    static fromEntity(entity: IUser): ProfilePasswordResponse {
        const response = new ProfilePasswordResponse();

        response.id = entity.id;
        response.password = entity.password;

        return response;
    }
}
