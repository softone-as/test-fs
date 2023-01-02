import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { UserAddressIndexRequest } from '../request/user-address-index.request';
import { UserAddress } from 'entities/iam/user-addresses.entity';
import { UserAddressResponse } from '../responses/user-address.response';
import { IndexApplication } from 'apps/api/src/infrastructure/applications/index.application';
import { IPaginateResponse } from 'apps/api/src/common/interface/index.interface';

@Injectable()
export class UserAddressIndexApplication extends IndexApplication {
    constructor(
        @Inject(REQUEST) private readonly request: Request,
        @InjectRepository(UserAddress)
        private readonly userAddressRepository: Repository<UserAddress>,
    ) {
        super();
    }

    async fetch(
        request: UserAddressIndexRequest,
    ): Promise<IPaginateResponse<UserAddressResponse>> {
        const userId = this.request.user['id'] || null;
        const UserAddressList: UserAddressResponse[] = [];

        const query = this.userAddressRepository
            .createQueryBuilder('userAddress')
            .innerJoinAndSelect('userAddress.user', 'user')
            .innerJoinAndSelect('userAddress.district', 'district')
            .innerJoinAndSelect('district.city', 'city')
            .where(`user_id = :userId`, { userId: userId });

        if (request.search) {
            query.andWhere(`concat(userAddress.mark) like :search`, {
                search: `%${request.search}%`,
            });
        }
        query.orderBy('userAddress.id', 'DESC');
        query.take(request.perPage ?? 10);
        query.skip(this.countOffset(request));

        const [datas, count] = await query.getManyAndCount();

        datas.forEach((data) => {
            UserAddressList.push(
                UserAddressResponse.fromEntityWithRelation(data),
            );
        });

        return {
            data: UserAddressList,
            meta: this.mapMeta(count, request),
        };
    }
}
