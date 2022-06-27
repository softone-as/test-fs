import { IBaseEntity } from 'interface-models/base-entity.interface';

export interface ICountry extends IBaseEntity {
    id: number;

    name: string;
}
