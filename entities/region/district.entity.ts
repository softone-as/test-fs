import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { ICity } from 'interface-models/region/city.interface';
import { BaseEntity } from 'entities/base.entity';
import { IDistrict } from 'interface-models/region/district.interface';
import { City } from './city.entity';

@Entity({ name: 'districts' })
export class District extends BaseEntity implements IDistrict {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => City, { onDelete: 'CASCADE', cascade: ['insert'] })
    @JoinColumn({ name: 'city_id' })
    city?: ICity;

    @Column({ name: 'city_id' })
    cityId?: number;
}
