import { IRole } from 'interface-models/iam/role.interface';
import { IUser } from 'interface-models/iam/user.interface';

export class UserResponse {

    id?: number;

    fullname?: string;

    phoneNumber?: string;

    role?: IRole;

    email: string;

    createdAt?: Date;

    updatedAt?: Date;

    static fromEntity(user: IUser): UserResponse {
        return {
            id: user.id,
            fullname: user.fullname,
            phoneNumber: user.phoneNumber,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };
    }

    static fromEntities(users: IUser[]): UserResponse[] {
        return users.map((user) => this.fromEntity(user));
    }
}
