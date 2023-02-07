import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { InertiaAdapter } from 'apps/backoffice/src/infrastructure/inertia/adapter/inertia.adapter';
import { IUser } from 'interface-models/iam/user.interface';
import { LoggedInGuard } from '../../auth/guards/logged-in.guard';
import { GetUserLogged } from '../../iam/decorators/get-user.decorator';
import { ProfileApplication } from '../applications/profile.application';
import { ProfileEditPasswordRequest } from '../requests/profile-edit-password.request';
import { ProfileEditRequest } from '../requests/profile-edit.request';

@Controller('profile')
@UseGuards(LoggedInGuard)
export class ProfileController {
    constructor(
        private readonly inertiaAdapter: InertiaAdapter,
        private readonly profileApplication: ProfileApplication,
    ) {}

    @Get()
    async detailPage(@GetUserLogged() user: IUser): Promise<void> {
        const data = await this.profileApplication.findById(user.id);
        return this.inertiaAdapter.render({
            component: 'Profile',
            props: {
                data,
            },
        });
    }

    @Put('edit')
    async edit(
        @GetUserLogged() user: IUser,
        @Body() request: ProfileEditRequest,
    ): Promise<void> {
        const data = await this.profileApplication.edit(user.id, request);
        return this.inertiaAdapter.render({
            component: 'Profile',
            props: {
                id: user.id,
                data,
                isUpdate: true,
            },
        });
    }

    @Put('edit/password')
    async editPassword(
        @GetUserLogged() user: IUser,
        @Body() request: ProfileEditPasswordRequest,
    ): Promise<void> {
        const data = await this.profileApplication.editPassword(
            user.id,
            request,
        );
        return this.inertiaAdapter.render({
            component: 'Profile',
            props: {
                id: user.id,
                data,
                isUpdate: true,
            },
        });
    }
}
