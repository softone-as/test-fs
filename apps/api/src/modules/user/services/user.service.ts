import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IUser } from 'interface-models/iam/user.interface';
import { User } from 'entities/iam/user.entity';
import { In, Not, QueryFailedError, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CacheEvict } from 'apps/api/src/infrastructure/cache/decorators/cache-evict.decorator';
import { config } from 'apps/api/src/config';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    @CacheEvict(config.cache.name.users.detail)
    async create(data: IUser): Promise<IUser> {
        const newuser = this.userRepository.create(data);
        return await this.userRepository.save(newuser);
    }

    async validateUser(email: string, password: string): Promise<IUser> {
        const user = await this.findOneByEmail(email);
        if (!user) {
            return null;
        }

        const isTrue = await bcrypt.compare(password, user.password);

        if (user && isTrue) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars, unused-imports/no-unused-vars
            return user;
        }

        return null;
    }

    async findOneByEmail(email: string): Promise<IUser> {
        return await this.userRepository.findOneOrFail({
            where: { email },
        });
    }

    async findByRoleExceptIds(
        roleId: number,
        exceptIds: number[],
    ): Promise<IUser[]> {
        return await this.userRepository.find({
            where: { role: { id: roleId }, id: Not(In(exceptIds)) },
        });
    }

    async findOneByPhoneNumber(phoneNumber: string): Promise<IUser> {
        return await this.userRepository.findOneOrFail({
            where: { phoneNumber },
        });
    }

    async isEmailExists(email: string, exceptId = 0): Promise<boolean> {
        return (
            (await this.userRepository.findOne({
                where: { email, id: Not(exceptId) },
            })) != null
        );
    }

    async isPhoneExists(phoneNumber: string, exceptId = 0): Promise<boolean> {
        return (
            (await this.userRepository.findOne({
                where: { phoneNumber, id: Not(exceptId) },
            })) != null
        );
    }

    @CacheEvict(config.cache.name.users.detail, config.cache.name.users.list)
    async changePassword(userId: number, newPassword: string): Promise<void> {
        await this.userRepository.update(
            {
                id: userId,
            },
            {
                password: newPassword,
            },
        );
    }

    @CacheEvict(config.cache.name.users.detail, config.cache.name.users.list)
    async updateEmail(userId: number, newEmail: string): Promise<void> {
        await this.userRepository.update(
            {
                id: userId,
            },
            {
                email: newEmail,
            },
        );
    }

    @CacheEvict(config.cache.name.users.detail, config.cache.name.users.list)
    async updateEmailByOldEmail(
        oldEmail: string,
        newEmail: string,
    ): Promise<void> {
        await this.userRepository.update(
            {
                email: oldEmail,
            },
            {
                email: newEmail,
            },
        );
    }

    @CacheEvict(config.cache.name.users.detail, config.cache.name.users.list)
    async updatePhoneNumberByPhoneNumber(
        phoneNumber: string,
        newPhoneNumber: string,
    ): Promise<void> {
        await this.userRepository.update(
            {
                phoneNumber,
            },
            {
                phoneNumber: newPhoneNumber,
            },
        );
    }

    async findOneById(id: number): Promise<IUser> {
        return await this.userRepository.findOneOrFail({
            where: {
                id,
            },
            relations: ['role', 'role.permissions', 'userAddresses'],
        });
    }

    async findAllWithRole(roleId: number): Promise<IUser[]> {
        return await this.userRepository.find({
            role: {
                id: roleId,
            },
        });
    }

    @CacheEvict(config.cache.name.users.detail)
    async update(id: number, data: IUser): Promise<IUser> {
        const status = await this.userRepository.update({ id }, { ...data });
        if (status.affected < 1) {
            throw new QueryFailedError('Error, Data not changed', null, null);
        }

        return data;
    }

    @CacheEvict(config.cache.name.users.detail)
    async softDelete(id: number): Promise<boolean> {
        const status = await this.userRepository.softDelete({ id });
        if (status.affected < 1) {
            throw new QueryFailedError('Error, Data not deleted', null, null);
        }

        return true;
    }
}