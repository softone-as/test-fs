import { GenderEnum, IUser } from 'interface-models/iam/user.interface';
import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Exclude, Transform } from 'class-transformer';
import { IRole } from 'interface-models/iam/role.interface';
import { Role } from './role.entity';
import { BaseEntity } from 'entities/base.entity';
import { UserAddress } from './user-addresses.entity';
import { IUserAddress } from 'interface-models/iam/user-addresses.interface';

@Entity({ name: 'users' })
export class User extends BaseEntity implements IUser {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Role, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'role_id' })
    role: IRole;

    @Column()
    fullname: string;

    @Column({ name: 'identity_number', unique: true })
    identityNumber: string;

    @Column({ name: 'phone_number', unique: true })
    phoneNumber: string;

    @Column({
        name: 'poin',
        nullable: true,
        type: 'decimal',
        precision: 16,
        scale: 2,
    })
    poin: number;

    @Column({
        name: 'lifetime_kg',
        nullable: true,
        type: 'decimal',
        precision: 16,
    })
    lifetimeKg: number;

    @OneToMany(() => UserAddress, (value) => value.user)
    @JoinColumn({ name: 'user_id' })
    userAddresses: IUserAddress[];

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

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword(): Promise<void> {
        if (this.password) {
            this.password = await bcrypt.hash(this.password, 10);
        }
    }
}
