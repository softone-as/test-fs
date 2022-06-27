import { Injectable } from '@nestjs/common';
import { IPermission } from 'interface-models/iam/permission.interface';
import { PermissionResponse } from '../responses/permission.response';
import { PermissionService } from '../services/permission.service';
import { PermissionEditRequest } from '../requests/permission-edit.request';
import { CacheService } from 'apps/backoffice/src/infrastructure/cache/services/cache.service';
import { config } from 'apps/backoffice/src/config';

@Injectable()
export class PermissionCrudApplication {
    constructor(
        private readonly permissionService: PermissionService,
        private readonly cacheService: CacheService,
    ) {}

    async edit(
        id: number,
        permissionRequest: PermissionEditRequest,
    ): Promise<PermissionResponse> {
        this.cacheService.cleanCacheMatches([
            config.cache.name.permissions.detail,
            config.cache.name.permissions.list,
        ]);
        await this.permissionService.findOneById(id);
        const updatePermission = await this.permissionService.update(id, {
            id: id,
            name: permissionRequest.name,
            key: permissionRequest.key,
        });

        return {
            id: updatePermission.id,
            name: updatePermission.name,
            key: updatePermission.key,
        };
    }

    async findById(id: number): Promise<IPermission> {
        const cacheName = await this.cacheService.getNameCacheDetailNumber(
            config.cache.name.permissions.detail,
            id,
        );
        const cacheData = await this.cacheService.getCache<IPermission>(
            cacheName,
        );
        if (cacheData != null) {
            return cacheData;
        }

        const results = await this.permissionService.findOneById(id);

        await this.cacheService.setCache<IPermission>(cacheName, results);

        return results;
    }

    async findAll(): Promise<IPermission[]> {
        const cacheName = await this.cacheService.getNameCacheList(
            config.cache.name.permissions.list,
            ['all'],
        );
        const cacheData = await this.cacheService.getCache<IPermission[]>(
            cacheName,
        );
        if (cacheData != null) {
            return cacheData;
        }

        const results = await this.permissionService.findAll();

        await this.cacheService.setCache<IPermission[]>(cacheName, results);

        return results;
    }
}
