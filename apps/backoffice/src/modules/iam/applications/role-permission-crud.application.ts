import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { IRolePermission } from 'interface-models/iam/role-permission.interface';
import { RolePermissionCreateRequest } from '../requests/role-permission-create.request';
import { RolePermissionResponse } from '../responses/role-permission.response';
import { RolePermissionService } from '../services/role-permission.service';
import { RolePermissionEditRequest } from '../requests/role-permission-edit.request';
import { RoleService } from '../services/role.service';
import { PermissionService } from '../services/permission.service';
import { RoleResponse } from '../responses/role.response';
import { PermissionResponse } from '../responses/permission.response';
import { CacheService } from 'apps/backoffice/src/infrastructure/cache/services/cache.service';
import { config } from 'apps/backoffice/src/config';
import { CacheEvict } from 'apps/backoffice/src/infrastructure/cache/decorators/cache-evict.decorator';

@Injectable()
export class RolePermissionCrudApplication {
    constructor(
        private readonly rolePermissionService: RolePermissionService,
        private readonly roleService: RoleService,
        private readonly permissionService: PermissionService,
        private readonly cacheService: CacheService,
    ) { }

    @CacheEvict(config.cache.name.rolePermissions.detail)
    async create(
        rolePermissionRequest: RolePermissionCreateRequest,
    ): Promise<RolePermissionResponse> {
        const rolePermissionExists =
            await this.rolePermissionService.findOneByRoleIdAndPermissionId(
                rolePermissionRequest.roleId,
                rolePermissionRequest.permissionId,
            );

        if (rolePermissionExists) {
            throw new UnprocessableEntityException(
                `Combination role and permission has already exists`,
            );
        }

        const newRolePermission = <IRolePermission>{};
        newRolePermission.role = await this.roleService.findOneById(
            rolePermissionRequest.roleId,
        );
        newRolePermission.permission = await this.permissionService.findOneById(
            rolePermissionRequest.permissionId,
        );

        const createRolePermission = await this.rolePermissionService.create(
            newRolePermission,
        );

        return {
            id: createRolePermission.id,
            role: RoleResponse.fromEntity(createRolePermission.role),
            permission: PermissionResponse.fromEntity(
                createRolePermission.permission,
            ),
            createdAt: createRolePermission.createdAt,
            updatedAt: createRolePermission.updatedAt,
        };
    }

    @CacheEvict(config.cache.name.rolePermissions.detail)
    async edit(
        id: number,
        rolePermissionRequest: RolePermissionEditRequest,
    ): Promise<RolePermissionResponse> {
        await this.rolePermissionService.findOneById(id);
        const updateRolePermission = await this.rolePermissionService.update(
            id,
            {
                id: id,
                role: await this.roleService.findOneById(
                    rolePermissionRequest.roleId,
                ),
                permission: await this.permissionService.findOneById(
                    rolePermissionRequest.permissionId,
                ),
            },
        );

        return {
            id: updateRolePermission.id,
            role: RoleResponse.fromEntity(updateRolePermission.role),
            permission: PermissionResponse.fromEntity(
                updateRolePermission.permission,
            ),
        };
    }

    @CacheEvict(config.cache.name.rolePermissions.detail)
    async delete(id: number): Promise<void> {
        await this.rolePermissionService.findOneById(id);
        await this.rolePermissionService.delete(id);
    }

    async findById(id: number): Promise<IRolePermission> {
        const results = await this.rolePermissionService.findOneById(id);
        return results;
    }
}
