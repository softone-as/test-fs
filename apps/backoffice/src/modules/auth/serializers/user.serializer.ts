import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { UserCrudService } from '../../iam/services/user-crud.service';
import { IUser } from 'interface-models/iam/user.interface';
import { User } from 'entities/iam/user.entity';

@Injectable()
export class UserSerializer extends PassportSerializer {
    constructor(private readonly adminApplication: UserCrudService) {
        super();
    }

    serializeUser(user: IUser, done: (err: Error, user: IUser) => void): void {
        done(new Error(), user);
    }

    async deserializeUser(
        payload: IUser,
        done: (err: Error, user: Omit<IUser, 'password'>) => void,
    ): Promise<void> {
        try {
            const user = await this.adminApplication.findById(payload.id);
            done(new Error(), user);
        } catch (e) {
            done(new Error(), new User());
        }
    }
}
