import {
    AfterInsert,
    AfterUpdate,
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { IRole } from 'interface-models/iam/role.interface';
import { Permission } from './permission.entity';
import { IPermission } from 'interface-models/iam/permission.interface';
import { LogActivityMenuEnum } from 'apps/backoffice/src/common/enums/log-activity.enum';
import { GlobalService } from 'apps/backoffice/src/modules/glob/service/global-service.service';
import { BaseEntity } from 'entities/base.entity';
import { User } from './user.entity';

export const ROLE_CHANGER = 'changer';
export const ROLE_ADMIN = 'admin';

@Entity({ name: 'roles' })
export class Role extends BaseEntity implements IRole {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    key: string;

    @ManyToMany(() => Permission)
    @JoinTable({ name: 'role_permissions' })
    permissions: IPermission[];

    @ManyToMany(() => User)
    @JoinTable({ name: 'user_roles' })
    users: User[];

    @AfterUpdate()
    createLogActivityUpdate(): void {
        GlobalService.createLogActivity({
            userId: null,
            menu: LogActivityMenuEnum.ROLE,
            path: __filename,
            metaData: this,
            source: this.id.toString(),
            activity: 'Update Role',
        });
    }

    @AfterInsert()
    createLogActivityInsert(): void {
        GlobalService.createLogActivity({
            userId: null,
            menu: LogActivityMenuEnum.ROLE,
            path: __filename,
            metaData: this,
            source: this.id.toString(),
            activity: 'Create new role',
        });
    }
}
