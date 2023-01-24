import { GenderEnum, IUser } from 'interface-models/iam/user.interface';
import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude, Transform } from 'class-transformer';
import { IRole } from 'interface-models/iam/role.interface';
import { Role } from './role.entity';
import { BaseEntity } from 'entities/base.entity';

@Entity({ name: 'users' })
export class User extends BaseEntity implements IUser {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToMany(() => Role)
    @JoinTable({
        name: 'user_role',
        joinColumn: { name: 'user_id', referencedColumnName: 'id' },
        inverseJoinColumn: {
            name: 'role_id',
            referencedColumnName: 'id',
        },
    })
    roles: IRole[];

    @Column()
    fullname: string;

    @Column({ name: 'identity_number', unique: true })
    identityNumber: string;

    @Column({ name: 'phone_number', unique: true })
    phoneNumber: string;

    @Column({ name: 'email_verified_at', nullable: true })
    emailVerifiedAt: Date;

    @Column({ name: 'one_signal_player_ids', nullable: true, type: 'json' })
    @Transform((value) => JSON.stringify(value))
    oneSignalPlayerIds: string[];

    @Column({ name: 'phone_verified_at', nullable: true })
    phoneNumberVerifiedAt: Date;

    @Column({ unique: true, nullable: true })
    email: string;

    @Column({ name: 'birth_date', nullable: true })
    birthDate?: Date;

    @Column({ name: 'gender' })
    gender?: GenderEnum;

    @Column()
    @Exclude()
    password: string;
}
