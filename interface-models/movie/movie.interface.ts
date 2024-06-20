import { IBaseEntity } from 'interface-models/base-entity.interface';
import { IMovieSchedule } from './movie-schedule.interface';
import { ITag } from './tag.interface';

export interface IMovie extends IBaseEntity {
    title: string;
    overview: string;
    poster: string;
    playUntil: Date;
    tags: ITag[];
    movieSchedules: IMovieSchedule[];
    isTMDB: boolean;
}
