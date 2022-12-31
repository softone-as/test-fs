import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IUser } from 'interface-models/iam/user.interface';
import { User } from 'entities/iam/user.entity';
import { In, Not, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async findOneById(id: number): Promise<IUser> {
        return await this.userRepository.findOneOrFail({
            where: { id },
            relations: ['role', 'role.permissions', 'userAddresses'],
        });
    }

    async findAll(take: number): Promise<IUser[]> {
        return await this.userRepository.find({
            take,
            relations: ['role', 'role.permissions', 'userAddresses'],
        });
    }

    async update(id: number, data: IUser): Promise<void> {
        await this.userRepository.update({ id }, {
            ...data
        });
    }

}
