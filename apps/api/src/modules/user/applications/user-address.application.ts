import { BadRequestException, Inject, Injectable } from '@nestjs/common';

import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { UserAddressService } from '../services/user-address.service';
import { AddUserAddressRequest } from '../request/user-address-create.request';
import { IUserAddress } from 'interface-models/iam/user-addresses.interface';
import { UserAddressResponse } from '../responses/user-address.response';
import { RegionService } from '../../region/services/region.service';

@Injectable()
export class UserAddressApplication {
    constructor(
        @Inject(REQUEST) private readonly request: Request,
        private readonly userAddressService: UserAddressService,
        private readonly regionService: RegionService,
    ) {}

    async addUserAddress(
        dataInput: AddUserAddressRequest,
    ): Promise<UserAddressResponse> {
        const userId = this.request.user['id'] || null;
        const newUserAddress = <IUserAddress>{};

        const [region, userAddress] = await Promise.all([
            this.regionService.findOneById(dataInput.districtId),
            this.userAddressService.findOneByUserId(userId),
        ]);

        if (!region) {
            throw new BadRequestException('Yur region ID is wrong');
        }

        // If new address set to primary, set others isPrimary false
        if (dataInput.isPrimary === true) {
            await this.userAddressService.updateAllByUserId(userId, <
                IUserAddress
            >{
                isPrimary: false,
            });
        }

        // If first address, force primary true
        if (dataInput.isPrimary === false && !userAddress) {
            dataInput.isPrimary = true;
        }

        Object.assign(newUserAddress, dataInput);
        newUserAddress.userId = userId;
        newUserAddress.disrictId = dataInput.districtId;

        const createUserAddress = await this.userAddressService.create(
            newUserAddress,
        );

        return UserAddressResponse.fromEntity(createUserAddress);
    }

    async editUserAddress(
        idUserAddress: number,
        data: AddUserAddressRequest,
    ): Promise<UserAddressResponse> {
        const userId = this.request.user['id'] || null;
        const newUserAddress = <IUserAddress>{};

        const [region] = await Promise.all([
            this.regionService.findOneById(data.districtId),
        ]);

        if (!region) {
            throw new BadRequestException('Yur region ID is wrong');
        }

        // If new address set to primary, set others isPrimary false
        if (data.isPrimary === true) {
            await this.userAddressService.updateAllByUserId(userId, <
                IUserAddress
            >{
                isPrimary: false,
            });
        }

        Object.assign(newUserAddress, data);
        const createUserAddress = await this.userAddressService.update(
            idUserAddress,
            newUserAddress,
        );

        return UserAddressResponse.fromEntity(createUserAddress);
    }

    async findUserAddressById(
        userAddressId: number,
    ): Promise<UserAddressResponse> {
        const userId = this.request.user['id'] || null;

        // Query
        const userAddressData = await this.userAddressService.findOneByIdUserId(
            userAddressId,
            userId,
        );

        return UserAddressResponse.fromEntityWithRelation(userAddressData);
    }

    async deleteUserAddressById(id: number): Promise<void> {
        await this.userAddressService.delete(id);
    }
}
