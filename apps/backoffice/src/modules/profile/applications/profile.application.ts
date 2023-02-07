import { Injectable } from '@nestjs/common';
import { IUser } from 'interface-models/iam/user.interface';
import { ProfileEditPasswordRequest } from '../requests/profile-edit-password.request';
import { ProfileEditRequest } from '../requests/profile-edit.request';
import { ProfileService } from '../services/profile.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ProfileApplication {
    constructor(private readonly profileService: ProfileService) {}

    async findById(id: number): Promise<IUser> {
        const data = await this.profileService.findOneById(id);
        return data;
    }

    async edit(id: number, request: ProfileEditRequest): Promise<IUser> {
        const user = await this.profileService.findOneById(id);

        user.fullname = request.fullname;
        user.email = request.email;
        user.phoneNumber = request.phoneNumber;
        // Asign next updatable field
        // Don't use object assign because not all field updatable

        return await this.profileService.update(id, user);
    }

    async editPassword(
        id: number,
        request: ProfileEditPasswordRequest,
    ): Promise<IUser> {
        const user = await this.profileService.findOneById(id);

        user.password = await bcrypt.hash(request.password, 10);

        return await this.profileService.update(id, user);
    }
}
