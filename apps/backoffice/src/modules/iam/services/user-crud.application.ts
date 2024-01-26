import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { IUser } from 'interface-models/iam/user.interface';
import { UserCreateRequest } from '../requests/user-create.request';
import { UserService } from '../repositories/user.service';
import { UserUpdateRequest } from '../requests/user-update.request';
import { config } from 'apps/backoffice/src/config';
import { CacheClear } from 'apps/backoffice/src/infrastructure/cache/decorators/cache-clear.decorator';
import { Utils } from 'apps/backoffice/src/common/utils/util';
import { Role } from 'entities/iam/role.entity';
import { User } from 'entities/iam/user.entity';
import dataSource from 'databases/data-source';

@Injectable()
export class UserCrudApplication {
    constructor(private readonly userService: UserService) {}

    @CacheClear(config.cache.name.users.detail)
    async create(userRequest: UserCreateRequest): Promise<void> {
        const emailExists = await this.userService.isEmailExists(
            userRequest.email,
        );

        if (emailExists) {
            throw new UnprocessableEntityException(
                `User ${userRequest.email} has already exists`,
            );
        }

        const roles = await dataSource
            .getRepository(Role)
            .findByIds(userRequest.roles);

        const userCreate = new User();

        userCreate.fullname = userRequest.fullname;
        userCreate.email = userRequest.email;
        userCreate.phoneNumber = userRequest.phoneNumber;
        userCreate.identityNumber = userRequest.phoneNumber;
        userCreate.password = await Utils.bcryptHash(userRequest.password);
        userCreate.roles = roles;

        await this.userService.create(userCreate);
    }

    async findById(id: number): Promise<IUser> {
        const results = await this.userService.findOneById(id);
        return results;
    }

    async findByRole(id: number): Promise<IUser[]> {
        const results = await this.userService.findAllWithRole(id);
        return results;
    }

    async findByPhoneNumber(phoneNumber: string): Promise<IUser> {
        const results = await this.userService.findOneByPhoneNumber(
            phoneNumber,
        );
        return results;
    }

    async findAllWithRole(roleId: number): Promise<IUser[]> {
        const results = await this.userService.findAllWithRole(roleId);
        return results;
    }

    async bulkDelete(ids: number[]): Promise<void> {
        await this.userService.bulkDelete(ids);
    }

    @CacheClear(config.cache.name.users.detail)
    async delete(id: number): Promise<void> {
        await this.userService.delete(id);
    }

    @CacheClear(config.cache.name.users.detail)
    async update(id: number, request: UserUpdateRequest): Promise<void> {
        const userExists = await this.userService.findByIdAndEmail(
            request.email,
            id,
        );

        if (!userExists) {
            throw new UnprocessableEntityException(
                `Email ${request.email} is not exists`,
            );
        }

        const roles = await dataSource
            .getRepository(Role)
            .findByIds(request.roles);

        userExists.fullname = request.fullname;
        userExists.email = request.email;
        userExists.phoneNumber = request.phoneNumber;
        userExists.roles = roles;

        if (request.password) {
            userExists.password = await Utils.bcryptHash(request.password);
        }

        await this.userService.repository.save(userExists);
    }
}
