import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { UserCreateRequest } from '../requests/user-create.request';
import { UserRepository } from '../repositories/user.repository';
import { UserUpdateRequest } from '../requests/user-update.request';
import { CacheClear } from '../../../../src/infrastructure/cache/decorators/cache-clear.decorator';
import { RoleIndexRequest } from '../requests/role-index.request';
import { RoleRepository } from '../repositories/role.repository';
import { IPaginateResponse } from '../../../common/interface/index.interface';
import { IUser } from 'interface-models/iam/user.interface';
import { config } from '../../../config';
import { User } from '../../../../../../entities/iam/user.entity';
import { Utils } from '../../../common/utils/util';
import { In } from 'typeorm';

@Injectable()
export class UserCrudService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly roleRepository: RoleRepository,
    ) {}

    async pagination(
        request: RoleIndexRequest,
    ): Promise<IPaginateResponse<IUser>> {
        return this.userRepository.pagination(request);
    }

    @CacheClear(config.cache.name.users.detail)
    async create(userRequest: UserCreateRequest): Promise<void> {
        const emailExists = await this.userRepository.isEmailExists(
            userRequest.email,
        );

        if (emailExists) {
            throw new UnprocessableEntityException(
                `User ${userRequest.email} has already exists`,
            );
        }

        const roles = await this.roleRepository.findBy({
            id: In(userRequest.roles),
        });

        const userCreate = new User();

        userCreate.fullname = userRequest.fullname;
        userCreate.email = userRequest.email;
        userCreate.phoneNumber = userRequest.phoneNumber;
        userCreate.identityNumber = userRequest.phoneNumber;
        userCreate.password = await Utils.bcryptHash(userRequest.password);
        userCreate.roles = roles;

        await this.userRepository.save(userCreate);
    }

    async findById(id: number): Promise<IUser> {
        const results = await this.userRepository.findOneOrFail({
            where: { id },
            relations: ['roles', 'roles.permissions'],
        });
        return results;
    }

    async findByPhoneNumber(phoneNumber: string): Promise<IUser> {
        const results = await this.userRepository.findOneByOrFail({
            phoneNumber,
        });
        return results;
    }

    async findAllWithRole(roleId: number): Promise<IUser[]> {
        const results = await this.userRepository.find({
            where: { roles: { id: roleId } },
            relations: ['roles', 'roles.permissions'],
        });
        return results;
    }

    async bulkDelete(ids: number[]): Promise<void> {
        await this.userRepository.bulkDelete(ids);
    }

    @CacheClear(config.cache.name.users.detail)
    async delete(id: number): Promise<void> {
        await this.userRepository.delete(id);
    }

    @CacheClear(config.cache.name.users.detail)
    async update(id: number, request: UserUpdateRequest): Promise<void> {
        const userExists = await this.userRepository.findByIdAndEmail(
            request.email,
            id,
        );

        if (!userExists) {
            throw new UnprocessableEntityException(
                `Email ${request.email} is not exists`,
            );
        }

        const roles = await this.roleRepository.findByIds(request.roles);

        userExists.fullname = request.fullname;
        userExists.email = request.email;
        userExists.phoneNumber = request.phoneNumber;
        userExists.roles = roles;

        if (request.password) {
            userExists.password = await Utils.bcryptHash(request.password);
        }

        await this.userRepository.save(userExists);
    }
}
