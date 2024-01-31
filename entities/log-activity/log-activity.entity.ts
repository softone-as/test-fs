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
    @JoinColumn()
    user: IUser | null;

    @Column({ type: 'json', nullable: true })
    metaData: any;

    @Column({ nullable: true })
    source: string;

    @Column()
    activity: string;

    @Column({ nullable: true })
    menu: string;

    @Column({ nullable: true })
    path: string;

    @CreateDateColumn()
    createdAt?: Date;
}
