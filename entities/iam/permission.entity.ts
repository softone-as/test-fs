import {
    AfterInsert,
    AfterUpdate,
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { IPermission } from 'interface-models/iam/permission.interface';
import { BaseEntity } from 'entities/base.entity';
import { LogActivityMenuEnum } from 'apps/backoffice/src/common/enums/log-activity.enum';
import { GlobalService } from 'apps/backoffice/src/modules/glob/service/global-service.service';
import { Role } from './role.entity';

@Entity({ name: 'permissions' })
export class Permission extends BaseEntity implements IPermission {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    key: string;

    @ManyToMany(() => Role)
    @JoinTable({ name: 'role_permissions' })
    roles: Role[];

    @AfterUpdate()
    createLogActivityUpdate(): void {
        GlobalService.createLogActivity({
            userId: null,
            menu: LogActivityMenuEnum.PERMISSION,
            path: __filename,
            metaData: this,
            source: this.id.toString(),
            activity: 'Update permission',
        });
    }

    @AfterInsert()
    createLogActivityInsert(): void {
        GlobalService.createLogActivity({
            userId: null,
            menu: LogActivityMenuEnum.PERMISSION,
            path: __filename,
            metaData: this,
            source: this.id.toString(),
            activity: 'Create new permission',
        });
    }
}
