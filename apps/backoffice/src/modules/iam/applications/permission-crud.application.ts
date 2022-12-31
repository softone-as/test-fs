import { Injectable } from '@nestjs/common';
import { IPermission } from 'interface-models/iam/permission.interface';
import { PermissionResponse } from '../responses/permission.response';
import { PermissionService } from '../services/permission.service';
import { PermissionEditRequest } from '../requests/permission-edit.request';
import { CacheService } from 'apps/backoffice/src/infrastructure/cache/services/cache.service';
import { config } from 'apps/backoffice/src/config';
import { CacheEvict } from 'apps/backoffice/src/infrastructure/cache/decorators/cache-evict.decorator';

@Injectable()
export class PermissionCrudApplication {
    constructor(
        private readonly permissionService: PermissionService,
        private readonly cacheService: CacheService,
    ) { }

    @CacheEvict(config.cache.name.permissions.detail)
    async edit(
        id: number,
        permissionRequest: PermissionEditRequest,
    ): Promise<PermissionResponse> {
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
        const results = await this.permissionService.findOneById(id);
        return results;
    }

    async findAll(): Promise<IPermission[]> {
        const results = await this.permissionService.findAll();
        return results;
    }
}
