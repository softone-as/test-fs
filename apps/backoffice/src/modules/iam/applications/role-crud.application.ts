import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { IRole } from 'interface-models/iam/role.interface';
import { Role } from 'entities/iam/role.entity';
import { RoleCreateRequest } from '../requests/role-create.request';
import { RoleService } from '../services/role.service';
import { RoleEditRequest } from '../requests/role-edit.request';
import { config } from 'apps/backoffice/src/config';
import { CacheClear } from 'apps/backoffice/src/infrastructure/cache/decorators/cache-clear.decorator';
import { getManager } from 'typeorm';
import { Permission } from 'entities/iam/permission.entity';

@Injectable()
export class RoleCrudApplication {
    constructor(private readonly roleService: RoleService) {}

    @CacheClear(config.cache.name.roles.detail)
    async create(roleRequest: RoleCreateRequest): Promise<IRole> {
        const isRoleExists = await this.roleService.isRoleExistsByKey(
            roleRequest.key,
        );
        if (isRoleExists) {
            throw new UnprocessableEntityException(
                `Role ${roleRequest.key} has already exists`,
            );
        }

        const permissions = await getManager()
            .getRepository(Permission)
            .findByIds(roleRequest.permissions);

        const newRole = new Role();
        Object.assign(newRole, roleRequest);

        newRole.permissions = permissions;
        const createRole = await this.roleService.create(newRole);

        return {
            id: createRole.id,
            name: createRole.name,
            key: createRole.key,
            createdAt: createRole.createdAt,
            updatedAt: createRole.updatedAt,
            permissions: createRole.permissions,
        };
    }

    @CacheClear(config.cache.name.roles.detail)
    async edit(id: number, roleRequest: RoleEditRequest): Promise<IRole> {
        const roleExists = await this.roleService.findRoleByKeyAndId(
            roleRequest.key,
            id,
        );

        if (!roleExists) {
            throw new UnprocessableEntityException(
                `Role ${roleRequest.key} is not exists`,
            );
        }

        const permissions = await getManager()
            .getRepository(Permission)
            .findByIds(roleRequest.permissionIds);

        roleExists.name = roleRequest.name;
        roleExists.key = roleRequest.key;
        roleExists.permissions = permissions;

        return await this.roleService.repository.save(roleExists);
    }

    @CacheClear(config.cache.name.roles.detail)
    async delete(id: number): Promise<void> {
        await this.roleService.findOneById(id);
        await this.roleService.delete(id);
    }

    async findById(id: number): Promise<IRole> {
        const results = await this.roleService.findOneById(id);
        return results;
    }

    async findByKey(key: string): Promise<IRole> {
        const results = await this.roleService.findOneByKey(key);
        return results;
    }

    async findAll(): Promise<IRole[]> {
        const results = await this.roleService.findAll();
        return results;
    }
}
