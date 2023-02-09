import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { IUser } from 'interface-models/iam/user.interface';
import { User } from 'entities/iam/user.entity';
import { UserCreateRequest } from '../requests/user-create.request';
import { UserResponse } from '../responses/user.response';
import { UserService } from '../services/user.service';
import { UserUpdateRequest } from '../requests/user-update.request';
import { config } from 'apps/backoffice/src/config';
import { RoleService } from '../services/role.service';
import { CacheClear } from 'apps/backoffice/src/infrastructure/cache/decorators/cache-clear.decorator';
import { Utils } from 'apps/backoffice/src/common/utils/util';

@Injectable()
export class UserCrudApplication {
    constructor(
        private readonly adminService: UserService,
        private readonly roleService: RoleService,
    ) {}

    @CacheClear(config.cache.name.users.detail)
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
        newAdmin.identityNumber = adminRequest.phoneNumber;
        Object.assign(newAdmin, adminRequest);

        return await this.adminService.create(newAdmin);
    }

    async findById(id: number): Promise<IUser> {
        const results = await this.adminService.findOneById(id);
        return results;
    }

    async findByRole(id: number): Promise<IUser[]> {
        const results = await this.adminService.findAllWithRole(id);
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

    @CacheClear(config.cache.name.users.detail)
    async delete(id: number): Promise<void> {
        await this.adminService.delete(id);
    }

    @CacheClear(config.cache.name.users.detail)
    async update(id: number, request: UserUpdateRequest): Promise<void> {
        const userExists = await this.adminService.findByIdAndEmail(
            request.email,
            id,
        );
        if (!userExists) {
            throw new UnprocessableEntityException(
                `Email ${request.email} is not exists`,
            );
        }

        const updateUser = <IUser>{
            fullname: request.fullname,
            email: request.email,
            phoneNumber: request.phoneNumber,
            roles: request.roles,
        };

        if (request.password) {
            updateUser.password = await Utils.bcryptHash(request.password);
        }

        await this.adminService.update(id, updateUser, userExists);
    }
}
