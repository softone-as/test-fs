import { Injectable } from '@nestjs/common';
import { ProfileEditPasswordRequest } from '../requests/profile-edit-password.request';
import { ProfileEditRequest } from '../requests/profile-edit.request';
import { ProfileService } from '../services/profile.service';
import * as bcrypt from 'bcrypt';
import { ProfileUserResponse } from '../responses/profile.response';

@Injectable()
export class ProfileApplication {
    constructor(private readonly profileService: ProfileService) {}

    async findById(id: number): Promise<ProfileUserResponse> {
        const data = await this.profileService.findOneById(id);
        return ProfileUserResponse.fromEntity(data);
    }

    async edit(
        id: number,
        request: ProfileEditRequest,
    ): Promise<ProfileUserResponse> {
        const user = await this.profileService.findOneById(id);

        user.fullname = request.fullname;
        user.email = request.email;
        user.phoneNumber = request.phoneNumber;
        user.identityNumber = request.identityNumber;
        user.gender = request.gender;
        user.birthDate = request.birthDate;
        // Asign next updatable field
        // Don't use object assign because not all field updatable

        const data = await this.profileService.update(id, user);
        return ProfileUserResponse.fromEntity(data);
    }

    async editPassword(
        id: number,
        request: ProfileEditPasswordRequest,
    ): Promise<ProfileUserResponse> {
        const user = await this.profileService.findOneById(id);

        user.password = await bcrypt.hash(request.password, 10);

        const data = await this.profileService.update(id, user);
        return ProfileUserResponse.fromEntity(data);
    }
}
