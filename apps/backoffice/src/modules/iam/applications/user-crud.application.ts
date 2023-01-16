import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { IUser } from 'interface-models/iam/user.interface';
import { User } from 'entities/iam/user.entity';
import { UserCreateRequest } from '../requests/user-create.request';
import { UserResponse } from '../responses/user.response';
import { UserService } from '../services/user.service';
import { UserUpdateRequest } from '../requests/user-update.request';
import { config } from 'apps/backoffice/src/config';
import { RoleService } from '../services/role.service';
import * as bcrypt from 'bcrypt';
import { CacheEvict } from 'apps/backoffice/src/infrastructure/cache/decorators/cache-evict.decorator';

@Injectable()
export class UserCrudApplication {
    constructor(
        private readonly adminService: UserService,
        private readonly roleService: RoleService,
    ) { }

    @CacheEvict(config.cache.name.users.detail)
    async create(adminRequest: UserCreateRequest): Promise<UserResponse> {
        const emailExists = await this.adminService.isEmailExists(
            adminRequest.email,
        );
        if (emailExists) {
            throw new UnprocessableEntityException(
                `User ${adminRequest.email} has already exists`,
            );
        }

        const newAdmin = new User();
        newAdmin.fullname = adminRequest.fullname;
        newAdmin.email = adminRequest.email;
        newAdmin.password = adminRequest.password;
        newAdmin.phoneNumber = adminRequest.phoneNumber;
        newAdmin.role = await this.roleService.findOneById(adminRequest.roleId);

        return await this.adminService.create(newAdmin);
    }

    async findById(id: number): Promise<IUser> {
        const results = await this.adminService.findOneById(id);
        return results;
    }

    async findByPhoneNumber(phoneNumber: string): Promise<IUser> {
        const results = await this.adminService.findOneByPhoneNumber(
            phoneNumber,
        );
        return results;
    }

    async findAllWithRole(roleId: number): Promise<IUser[]> {
        const results = await this.adminService.findAllWithRole(roleId);
        return results;
    }

    @CacheEvict(config.cache.name.users.detail)
    async delete(id: number): Promise<void> {
        await this.adminService.delete(id);
    }

    @CacheEvict(config.cache.name.users.detail)
    async update(id: number, request: UserUpdateRequest): Promise<void> {
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
