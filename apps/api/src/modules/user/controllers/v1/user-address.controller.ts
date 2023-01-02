import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    UseGuards,
} from '@nestjs/common';
import { IApiResponse } from 'apps/api/src/common/interface/response.interface';

import { LoggedInGuard } from '../../../auth/guards/logged-in.guard';
import { UserAddressIndexApplication } from '../../applications/user-address-index.application';
import { UserAddressApplication } from '../../applications/user-address.application';
import { AddUserAddressRequest } from '../../request/user-address-create.request';
import { UserAddressIndexRequest } from '../../request/user-address-index.request';
import { UserAddressResponse } from '../../responses/user-address.response';

@Controller('users')
@UseGuards(LoggedInGuard)
export class UserAddressController {
    constructor(
        private readonly userAddressApplication: UserAddressApplication,
        private readonly userAddressIndexApplication: UserAddressIndexApplication,
    ) {}

    @Post('address')
    async addUserAddress(
        @Body() data: AddUserAddressRequest,
    ): Promise<IApiResponse<UserAddressResponse>> {
        const userAddress = await this.userAddressApplication.addUserAddress(
            data,
        );

        return {
            data: userAddress,
            message: 'User Address Create Successfully',
        };
    }

    @Patch('address/:id')
    async editUserAddress(
        @Param('id') userAddressId: number,
        @Body() data: AddUserAddressRequest,
    ): Promise<IApiResponse<UserAddressResponse>> {
        const userAddress = await this.userAddressApplication.editUserAddress(
            userAddressId,
            data,
        );

        return {
            data: userAddress,
            message: 'User Address Update Successfully',
        };
    }

    @Delete('address/:id')
    async deleteUserAddress(
        @Param('id') userAddressId: number,
    ): Promise<IApiResponse<UserAddressResponse>> {
        await this.userAddressApplication.deleteUserAddressById(userAddressId);

        return {
            data: <UserAddressResponse>{
                id: userAddressId,
            },
            message: 'User Address Delete Successfully',
        };
    }

    @Get('address')
    async userAddressList(
        @Query() indexRequest: UserAddressIndexRequest,
    ): Promise<IApiResponse<UserAddressResponse[]>> {
        const { data, meta } = await this.userAddressIndexApplication.fetch(
            indexRequest,
        );

        return {
            data,
            meta,
            message: 'Success Get User Address List',
        };
    }

    @Get('address/:id')
    async depositPickupDetail(
        @Param('id') id: number,
    ): Promise<IApiResponse<UserAddressResponse>> {
        const data = await this.userAddressApplication.findUserAddressById(id);

        return {
            data,
            message: 'Success Get Detail User Address',
        };
    }
}
