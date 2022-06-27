import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { IRole } from 'interface-models/iam/role.interface';
import { Role } from 'entities/iam/role.entity';
import { RoleCreateRequest } from '../requests/role-create.request';
import { RoleResponse } from '../responses/role.response';
import { RoleService } from '../services/role.service';
import { RoleEditRequest } from '../requests/role-edit.request';
import { CacheService } from 'apps/backoffice/src/infrastructure/cache/services/cache.service';
import { config } from 'apps/backoffice/src/config';

@Injectable()
export class RoleCrudApplication {
    constructor(
        private readonly roleService: RoleService,
        private readonly cacheService: CacheService,
    ) {}

    async create(roleRequest: RoleCreateRequest): Promise<RoleResponse> {
        this.cacheService.cleanCacheMatches([
            config.cache.name.roles.detail,
            config.cache.name.roles.list,
        ]);
        const isRoleExists = await this.roleService.isRoleExistsByKey(
            roleRequest.key,
        );
        if (isRoleExists) {
            throw new UnprocessableEntityException(
                `Role ${roleRequest.key} has already exists`,
            );
        }

        const newRole = new Role();
        Object.assign(newRole, roleRequest);

        const createRole = await this.roleService.create(newRole);

        return {
            id: createRole.id,
            name: createRole.name,
            key: createRole.key,
            createdAt: createRole.createdAt,
            updatedAt: createRole.updatedAt,
        };
    }

    async edit(
        id: number,
        roleRequest: RoleEditRequest,
    ): Promise<RoleResponse> {
        this.cacheService.cleanCacheMatches([
            config.cache.name.roles.detail,
            config.cache.name.roles.list,
        ]);
        const isRoleExists = await this.roleService.isRoleExistsByKey(
            roleRequest.key,
            id,
        );
        if (isRoleExists) {
            throw new UnprocessableEntityException(
                `Role ${roleRequest.key} has already exists`,
            );
        }

        this.cacheService.cleanCacheMatches([
            config.cache.name.roles.detail,
            config.cache.name.roles.list,
        ]);
        await this.roleService.findOneById(id);
        const updateRole = await this.roleService.update(id, {
            id: id,
            name: roleRequest.name,
            key: roleRequest.key,
        });

        return {
            id: updateRole.id,
            name: updateRole.name,
            key: updateRole.key,
        };
    }

    async delete(id: number): Promise<void> {
        this.cacheService.cleanCacheMatches([
            config.cache.name.roles.detail,
            config.cache.name.roles.list,
        ]);
        await this.roleService.findOneById(id);
        await this.roleService.delete(id);
    }

    async findById(id: number): Promise<IRole> {
        const cacheName = await this.cacheService.getNameCacheDetailNumber(
            config.cache.name.roles.detail,
            id,
        );
        const cacheData = await this.cacheService.getCache<IRole>(cacheName);
        if (cacheData != null) {
            return cacheData;
        }

        const results = await this.roleService.findOneById(id);

        await this.cacheService.setCache<IRole>(cacheName, results);

        return results;
    }

    async findByKey(key: string): Promise<IRole> {
        const cacheName = await this.cacheService.getNameCacheDetailString(
            config.cache.name.roles.detail,
            key,
        );
        const cacheData = await this.cacheService.getCache<IRole>(cacheName);
        if (cacheData != null) {
            return cacheData;
        }

        const results = await this.roleService.findOneByKey(key);

        await this.cacheService.setCache<IRole>(cacheName, results);

        return results;
    }

    async findAll(): Promise<IRole[]> {
        const cacheName = await this.cacheService.getNameCacheList(
            config.cache.name.roles.detail,
            ['all'],
        );
        const cacheData = await this.cacheService.getCache<IRole[]>(cacheName);
        if (cacheData != null) {
            return cacheData;
        }

        const results = await this.roleService.findAll();

        await this.cacheService.setCache<IRole[]>(cacheName, results);

        return results;
    }
}
