import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { InertiaAdapter } from 'apps/backoffice/src/infrastructure/inertia/adapter/inertia.adapter';
import { IUser } from 'interface-models/iam/user.interface';
import { LoggedInGuard } from '../../auth/guards/logged-in.guard';
import { GetUserLogged } from '../../iam/decorators/get-user.decorator';
import { ProfileApplication } from '../applications/profile.application';
import { ProfileEditPasswordRequest } from '../requests/profile-edit-password.request';

@Controller('profile/edit/password')
@UseGuards(LoggedInGuard)
export class ProfilePasswordController {
    constructor(
        private readonly inertiaAdapter: InertiaAdapter,
        private readonly profileApplication: ProfileApplication,
    ) {}

    @Get()
    async editPage(@GetUserLogged() user: IUser): Promise<void> {
        const data = await this.profileApplication.findOneByIdOnlyPassword(
            user.id,
        );
        return this.inertiaAdapter.render({
            component: 'Profile/FormProfilePassword',
            props: {
                data,
            },
        });
    }

    @Put()
    async editPassword(
        @GetUserLogged() user: IUser,
        @Body() request: ProfileEditPasswordRequest,
    ): Promise<void> {
        await this.profileApplication.editPassword(user.id, request);
        return this.inertiaAdapter.successResponse('/profile', 'Sukses edit');
    }
}
