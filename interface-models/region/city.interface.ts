import { IBaseEntity } from 'interface-models/base-entity.interface';
import { IDistrict } from './district.interface';
import { IRegion } from './region.interface';

export interface ICity extends IBaseEntity {
    id?: number;

    name: string;

    region?: IRegion;

    districts: IDistrict[];
}
