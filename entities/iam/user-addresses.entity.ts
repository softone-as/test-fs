import { IUser } from 'interface-models/iam/user.interface';
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from 'entities/base.entity';
import { User } from './user.entity';
import { IUserAddress } from 'interface-models/iam/user-addresses.interface';
import { District } from 'entities/region/district.entity';
import { IDistrict } from 'interface-models/region/district.interface';

@Entity({ name: 'user_addresses' })
export class UserAddress extends BaseEntity implements IUserAddress {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: IUser;

    @Column()
    mark: string;

    @Column()
    address: string;

    @Column()
    longitude: string;

    @Column()
    latitude: string;

    @Column({ name: 'phone_number' })
    phoneNumber: string;

    @ManyToOne(() => District)
    @JoinColumn({ name: 'district_id' })
    district: IDistrict;

    @Column({ name: 'is_primary' })
    isPrimary: boolean;

    @Column({ name: 'user_id' })
    userId: number;

    @Column({ name: 'district_id' })
    districtId: number;
}
