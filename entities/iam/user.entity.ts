import { GenderEnum, IUser } from 'interface-models/iam/user.interface';
import {
    AfterInsert,
    AfterUpdate,
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
import { LogActivityMenuEnum } from 'apps/backoffice/src/common/enums/log-activity.enum';
import { GlobalService } from 'apps/backoffice/src/modules/glob/service/global-service.service';

@Entity({ name: 'users' })
export class User extends BaseEntity implements IUser {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToMany(() => Role)
    @JoinTable({ name: 'user_roles' })
    roles?: IRole[];

    @Column()
    fullname: string;

    @Column({ unique: true, nullable: true })
    email: string;

    @Column()
    @Exclude()
    password: string;

    @Column({ unique: true })
    identityNumber: string;

    @Column({ unique: true })
    phoneNumber: string;

    @Column({ nullable: true, type: 'json' })
    @Transform((value) => JSON.stringify(value))
    oneSignalPlayerIds?: string[];

    @Column({ nullable: true })
    emailVerifiedAt?: Date;

    @Column({ nullable: true })
    phoneNumberVerifiedAt?: Date;

    @Column()
    gender?: GenderEnum = GenderEnum.LakiLaki;

    @Column({ nullable: true })
    birthDate?: Date;

    @AfterUpdate()
    createLogActivityUpdate(): void {
        GlobalService.createLogActivity({
            userId: null,
            menu: LogActivityMenuEnum.USER,
            path: __filename,
            metaData: this,
            source: this.id.toString(),
            activity: 'Update user',
        });
    }

    @AfterInsert()
    createLogActivityInsert(): void {
        GlobalService.createLogActivity({
            userId: null,
            menu: LogActivityMenuEnum.USER,
            path: __filename,
            metaData: this,
            source: this.id.toString(),
            activity: 'Create new user',
        });
    }
}
