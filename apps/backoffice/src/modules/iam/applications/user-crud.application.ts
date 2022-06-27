import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { IUser } from 'interface-models/iam/user.interface';
import { User } from 'entities/iam/user.entity';
import { UserCreateRequest } from '../requests/user-create.request';
import { UserResponse } from '../responses/user.response';
import { UserService } from '../services/user.service';
import { UserUpdateRequest } from '../requests/user-update.request';
import { CacheService } from 'apps/backoffice/src/infrastructure/cache/services/cache.service';
import { config } from 'apps/backoffice/src/config';
import { RoleService } from '../services/role.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserCrudApplication {
    constructor(
        private readonly adminService: UserService,
        private readonly roleService: RoleService,
        private readonly cacheService: CacheService,
    ) {}

    async create(adminRequest: UserCreateRequest): Promise<UserResponse> {
        this.cacheService.cleanCacheMatches([
            config.cache.name.users.detail,
            config.cache.name.users.list,
        ]);
        const emailExists = await this.adminService.isEmailExists(
            adminRequest.email,
        );
        if (emailExists) {
            throw new UnprocessableEntityException(
                `User ${adminRequest.email} has already exists`,
            );
        }

        const newAdmin = new User();
        newAdmin.role = await this.roleService.findOneById(adminRequest.roleId);
        Object.assign(newAdmin, adminRequest);

        const createAdmin = await this.adminService.create(newAdmin);

        return {
            id: createAdmin.id,
            fullname: createAdmin.fullname,
            email: createAdmin.email,
            createdAt: createAdmin.createdAt,
            updatedAt: createAdmin.updatedAt,
        };
    }

    async findById(id: number, withCache = true): Promise<IUser> {
        const cacheName = await this.cacheService.getNameCacheDetailNumber(
            config.cache.name.users.detail,
            id,
        );
        const cacheData = await this.cacheService.getCache<IUser>(cacheName);
        if (cacheData != null && withCache) {
            return cacheData;
        }

        const results = await this.adminService.findOneById(id);
        results.userAddresses = results.userAddresses.filter(
            (address) => address.isPrimary === true,
        );
        await this.cacheService.setCache<IUser>(cacheName, results);

        return results;
    }

    async findByPhoneNumber(
        phoneNumber: string,
        withCache = true,
    ): Promise<IUser> {
        const cacheName = await this.cacheService.getNameCacheDetailString(
            config.cache.name.users.detail,
            phoneNumber,
        );
        const cacheData = await this.cacheService.getCache<IUser>(cacheName);
        if (cacheData != null && withCache) {
            return cacheData;
        }

        const results = await this.adminService.findOneByPhoneNumber(
            phoneNumber,
        );
        await this.cacheService.setCache<IUser>(cacheName, results);

        return results;
    }

    async findAllWithRole(roleId: number): Promise<IUser[]> {
        const cacheName = await this.cacheService.getNameCacheList(
            config.cache.name.users.list,
            ['all'],
        );
        const cacheData = await this.cacheService.getCache<IUser[]>(cacheName);
        if (cacheData != null) {
            return cacheData;
        }

        const results = await this.adminService.findAllWithRole(roleId);
        await this.cacheService.setCache<IUser[]>(cacheName, results);

        return results;
    }

    async delete(id: number): Promise<void> {
        this.cacheService.cleanCacheMatches([
            config.cache.name.users.detail,
            config.cache.name.users.list,
        ]);
        await this.adminService.delete(id);
    }

    async update(id: number, request: UserUpdateRequest): Promise<void> {
        this.cacheService.cleanCacheMatches([
            config.cache.name.users.detail,
            config.cache.name.users.list,
        ]);
        const emailExists = await this.adminService.isEmailExists(
            request.email,
            id,
        );
        if (emailExists) {
            throw new UnprocessableEntityException(
                `User ${request.email} has already exists`,
            );
        }

        const updateUser = <IUser>{
            fullname: request.fullname,
            email: request.email,
            phoneNumber: request.phoneNumber,
            role: await this.roleService.findOneById(request.roleId),
        };

        if (request.password) {
            updateUser.password = await bcrypt.hash(request.password, 10);
        }

        await this.adminService.update(id, updateUser);
    }
}
