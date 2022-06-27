import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { IPermission } from 'interface-models/iam/permission.interface';
import { BaseEntity } from 'entities/base.entity';
import { IRole } from 'interface-models/iam/role.interface';
import { Role } from './role.entity';

@Entity({ name: 'permission' })
export class Permission extends BaseEntity implements IPermission {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    key: string;

    @ManyToMany(() => Role)
    @JoinTable({
        name: 'role_permission',
        joinColumn: { name: 'permission_id', referencedColumnName: 'id' },
        inverseJoinColumn: {
            name: 'role_id',
            referencedColumnName: 'id',
        },
    })
    roles: IRole[];
}
