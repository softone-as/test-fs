import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IUser } from 'interface-models/iam/user.interface';
import { User } from 'entities/iam/user.entity';
import { In, Not, Repository } from 'typeorm';

@Injectable()
export class UserRepository extends Repository<User> {
    constructor(
        @InjectRepository(User)
        private readonly repo: Repository<User>,
    ) {
        super(repo.target, repo.manager, repo.queryRunner);
    }

    async findOneByEmail(email: string): Promise<IUser> {
        return await this.repo.findOne({
            where: { email },
        });
    }

    async findByRoleExceptIds(
        roleId: number,
        exceptIds: number[],
    ): Promise<IUser[]> {
        return await this.repo.find({
            where: { roles: { id: roleId }, id: Not(In(exceptIds)) },
        });
    }

    async findOneOrFailByPhoneNumber(phoneNumber: string): Promise<IUser> {
        return await this.repo.findOneOrFail({
            where: { phoneNumber },
        });
    }

    async findOneByEmailExceptId(
        email: string,
        exceptId: number,
    ): Promise<IUser> {
        return await this.repo.findOne({
            where: { email, id: Not(exceptId) },
        });
    }

    async findOneByPhoneNumberExceptId(
        phoneNumber: string,
        exceptId: number,
    ): Promise<IUser> {
        return await this.repo.findOne({
            where: { phoneNumber, id: Not(exceptId) },
        });
    }

    async findOneByIdOrFailWithRoleAndPermissions(id: number): Promise<IUser> {
        return await this.repo.findOneOrFail({
            where: { id },
            relations: ['roles', 'roles.permissions'],
        });
    }

    async findWithRoleAndPermissionsByRoleId(roleId: number): Promise<IUser[]> {
        return await this.repo.find({
            where: { roles: { id: roleId } },
            relations: ['roles', 'roles.permissions'],
        });
    }

    async createUser(data: IUser): Promise<void> {
        const newuser = this.repo.create(data);
        await this.repo.save(newuser);
    }
}
