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

    async create(data: IUser): Promise<IUser> {
        const newuser = this.userRepository.create(data);
        return await this.userRepository.save(newuser);
    }

    async validateUser(email: string, password: string): Promise<IUser> {
        const user = await this.findOneByEmail(email);

        const isTrue = await bcrypt.compare(password, user.password);

        if (user && isTrue) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars, unused-imports/no-unused-vars
            return user;
        }

        return null;
    }

    async findOneByEmail(email: string): Promise<IUser> {
        return await this.userRepository.findOneOrFail({
            where: { email },
        });
    }

    async findByRoleExceptIds(
        roleId: number,
        exceptIds: number[],
    ): Promise<IUser[]> {
        return await this.userRepository.find({
            where: { role: { id: roleId }, id: Not(In(exceptIds)) },
        });
    }

    async findOneByPhoneNumber(phoneNumber: string): Promise<IUser> {
        return await this.userRepository.findOneOrFail({
            where: { phoneNumber },
        });
    }

    async isEmailExists(email: string, exceptId = 0): Promise<boolean> {
        return (
            (await this.userRepository.findOne({
                where: { email, id: Not(exceptId) },
            })) != null
        );
    }

    async findOneById(id: number): Promise<IUser> {
        return await this.userRepository.findOneOrFail({
            where: { id },
            relations: ['role', 'role.permissions'],
        });
    }

    async findAllWithRole(roleId: number): Promise<IUser[]> {
        return await this.userRepository.find({
            role: {
                id: roleId,
            },
        });
    }

    async delete(id: number): Promise<void> {
        await this.userRepository.delete({ id });
    }

    async update(id: number, data: IUser): Promise<void> {
        await this.userRepository.update({ id }, { ...data });
    }
}
