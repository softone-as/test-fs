import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { IRegion } from 'interface-models/region/region.interface';
import { ICountry } from 'interface-models/region/country.interface';
import { Country } from './country.entity';
import { BaseEntity } from 'entities/base.entity';
import { ICity } from 'interface-models/region/city.interface';
import { City } from './city.entity';

@Entity({ name: 'regions' })
export class Region extends BaseEntity implements IRegion {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    country_id: number;

    @ManyToOne(() => Country, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'country_id' })
    country: ICountry;

    @OneToMany(() => City, (value) => value.region, { cascade: ['insert'] })
    @JoinColumn({ name: 'region_id' })
    cities: ICity[];
}
