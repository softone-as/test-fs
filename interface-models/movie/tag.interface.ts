import { IBaseEntity } from 'interface-models/base-entity.interface';
import { IMovie } from './movie.interface';

export interface ITag extends IBaseEntity {
    name: string;
    movies: IMovie[];
}
