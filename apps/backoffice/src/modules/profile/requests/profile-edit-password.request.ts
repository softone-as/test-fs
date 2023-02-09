import { PickType } from '@nestjs/swagger';
import { UserUpdateRequest } from '../../iam/requests/user-update.request';

export class ProfileEditPasswordRequest extends PickType(UserUpdateRequest, [
    'password',
]) {}
