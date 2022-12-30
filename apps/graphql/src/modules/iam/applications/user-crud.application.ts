import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { IUser } from 'interface-models/iam/user.interface';
import { UserService } from '../services/user.service';

@Injectable()
export class UserCrudApplication {
    constructor(
        private readonly adminService: UserService,
    ) { }

    async findById(id: number): Promise<IUser> {
        const results = await this.adminService.findOneById(id);
        results.userAddresses = results.userAddresses.filter(
            (address) => address.isPrimary === true,
        );
        return results;
    }

    async getAll(): Promise<IUser[]> {
        return await this.adminService.findAll();
    }

}
