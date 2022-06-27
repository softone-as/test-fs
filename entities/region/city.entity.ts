import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { IRegion } from 'interface-models/region/region.interface';
import { ICity } from 'interface-models/region/city.interface';
import { Region } from './region.entity';
import { BaseEntity } from 'entities/base.entity';
import { IDistrict } from 'interface-models/region/district.interface';
import { District } from './district.entity';

@Entity({ name: 'cities' })
export class City extends BaseEntity implements ICity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    region_id: number;

    @ManyToOne(() => Region, { onDelete: 'CASCADE', cascade: ['insert'] })
    @JoinColumn({ name: 'region_id' })
    region: IRegion;

    @OneToMany(() => District, (value) => value.city, { cascade: ['insert'] })
    @JoinColumn({ name: 'city_id' })
    districts: IDistrict[];
}
