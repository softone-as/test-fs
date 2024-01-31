import { BaseEntity } from 'entities/base.entity';
import { User } from 'entities/iam/user.entity';
import { IUser } from 'interface-models/iam/user.interface';
import {
    IInAppNotification,
    NotificationTypeEnum,
} from 'interface-models/notification/in-app-notification.interface';
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'in_app_notifications' })
export class InAppNotification
    extends BaseEntity
    implements IInAppNotification
{
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User)
    @JoinColumn()
    targetUser: IUser;

    @Column()
    targetUserId: number;

    @Column()
    type: NotificationTypeEnum;

    @Column()
    title: string;

    @Column()
    message: string;

    @Column({ type: 'json', nullable: true })
    meta: any;

    @Column()
    isRead: boolean;
}
