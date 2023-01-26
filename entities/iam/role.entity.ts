import {
    BaseEntity,
    BeforeUpdate,
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
import { LogActivityDto } from 'entities/log-activity/dto/log-activity.dto';
import { User } from './user.entity';
import { IUser } from 'interface-models/iam/user.interface';

export const ROLE_CHANGER = 'changer';
export const ROLE_ADMIN = 'changer';

@Entity({ name: 'roles' })
export class Role extends BaseEntity implements IRole {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    key: string;

    @ManyToMany(() => Permission)
    @JoinTable({
        name: 'role_permission',
        joinColumn: { name: 'role_id', referencedColumnName: 'id' },
        inverseJoinColumn: {
            name: 'permission_id',
            referencedColumnName: 'id',
        },
    })
    permissions: IPermission[];

    @ManyToMany(() => User)
    @JoinTable({
        name: 'user_role',
        joinColumn: { name: 'role_id', referencedColumnName: 'id' },
        inverseJoinColumn: {
            name: 'user_id',
            referencedColumnName: 'id',
        },
    })
    users: IUser[];

    @BeforeUpdate()
    async createLogActivity() {
        const logActivity: LogActivityDto = {
            menu: LogActivityMenuEnum.ROLE,
            path: __filename,
            user: null,
            old_data: await Role.findById(this.id),
            new_data: this,
            activity: 'Update Role',
        };

        GlobalService.createLogActivity(logActivity);
    }

    static findById(id: number) {
        return this.createQueryBuilder('roles')
            .where('roles.id = :id', { id })
            .getOne();
    }
}
