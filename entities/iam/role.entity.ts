import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { IRole } from 'interface-models/iam/role.interface';
import { BaseEntity } from 'entities/base.entity';
import { Permission } from './permission.entity';
import { IPermission } from 'interface-models/iam/permission.interface';

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
}
