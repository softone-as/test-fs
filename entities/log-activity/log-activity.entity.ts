import { User } from 'entities/iam/user.entity';
import { IUser } from 'interface-models/iam/user.interface';
import { ILogActivity } from 'interface-models/log-activity/log-activity.interface';
import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    Column,
    CreateDateColumn,
} from 'typeorm';

@Entity({ name: 'log_activities' })
export class LogActivity implements ILogActivity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: IUser;

    @Column({ name: 'old_data', type: 'json', nullable: true })
    old_data: any;

    @Column({ name: 'new_data', type: 'json', nullable: true })
    new_data: any;

    @Column({ name: 'activity' })
    activity: string;

    @Column({ name: 'status' })
    status: string;

    @Column({ name: 'menu' })
    menu: string;

    @Column({ name: 'path' })
    path: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt?: Date;
}
