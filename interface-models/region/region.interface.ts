import { IBaseEntity } from 'interface-models/base-entity.interface';
import { ICity } from './city.interface';
import { ICountry } from './country.interface';

export interface IRegion extends IBaseEntity {
    id?: number;

    name: string;

    country?: ICountry;

    cities: ICity[];
}
