import {
    Column,
    Entity,
    JoinColumn,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { ICountry } from 'interface-models/region/country.interface';
import { BaseEntity } from 'entities/base.entity';
import { Region } from './region.entity';
import { IRegion } from 'interface-models/region/region.interface';

@Entity({ name: 'countries' })
export class Country extends BaseEntity implements ICountry {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Region, (value) => value.country, { cascade: ['insert'] })
    @JoinColumn({ name: 'country_id' })
    regions: IRegion[];
}
