import { IBaseEntity } from 'interface-models/base-entity.interface';
import { ICity } from './city.interface';

export interface IDistrict extends IBaseEntity {
    id: number;

    name: string;

    city?: ICity;

    cityId?: number;
}
