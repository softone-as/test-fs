import { IUser } from 'interface-models/iam/user.interface';

export class UserResponse {
    id?: number;

    fullname?: string;

    email: string;

    createdAt?: Date;

    updatedAt?: Date;

    static fromEntity(user: IUser): UserResponse {
        return {
            id: user.id,
            fullname: user.fullname,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };
    }
}
