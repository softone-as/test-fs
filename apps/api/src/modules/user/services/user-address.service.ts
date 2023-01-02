import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { UserAddress } from 'entities/iam/user-addresses.entity';
import { IUserAddress } from 'interface-models/iam/user-addresses.interface';
import { CacheEvict } from 'apps/api/src/infrastructure/cache/decorators/cache-evict.decorator';
import { config } from 'apps/api/src/config';

@Injectable()
export class UserAddressService {
    constructor(
        @InjectRepository(UserAddress)
        private readonly userAddressRepository: Repository<UserAddress>,
    ) {}

    @CacheEvict(config.cache.name.userAddresses.detail)
    async create(data: IUserAddress): Promise<IUserAddress> {
        const newuserAddress = this.userAddressRepository.create(data);
        return await this.userAddressRepository.save(newuserAddress);
    }

    async findOneById(id: number): Promise<IUserAddress> {
        return await this.userAddressRepository.findOneOrFail({
            where: {
                id,
            },
            relations: ['user', 'district'],
        });
    }

    async findOneByIdUserId(id: number, userId: number): Promise<IUserAddress> {
        return await this.userAddressRepository.findOneOrFail({
            where: {
                id,
                userId,
            },
            relations: ['user', 'district', 'district.city'],
        });
    }

    async findOneByUserId(userId: number): Promise<IUserAddress> {
        let getUserAddress:
            | UserAddress
            | IUserAddress
            | PromiseLike<IUserAddress>;
        try {
            getUserAddress = await this.userAddressRepository.findOneOrFail({
                where: {
                    userId,
                },
            });
        } catch (err) {
            return;
        }

        return getUserAddress;
    }

    @CacheEvict(config.cache.name.userAddresses.detail)
    async delete(id: number): Promise<void> {
        await this.userAddressRepository.softDelete({ id });
    }

    @CacheEvict(config.cache.name.userAddresses.detail)
    async update(id: number, data: IUserAddress): Promise<IUserAddress> {
        const status = await this.userAddressRepository.update(
            { id },
            { ...data },
        );
        if (status.affected < 1) {
            throw new QueryFailedError('Error, Data not changed', null, null);
        }

        return data;
    }

    @CacheEvict(config.cache.name.userAddresses.detail)
    async updateAllByUserId(userId: number, data: IUserAddress): Promise<void> {
        await this.userAddressRepository.update({ userId }, { ...data });
    }
}
