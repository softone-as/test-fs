import { IBaseEntity } from 'interface-models/base-entity.interface';
import { IMovieSchedule } from './movie-schedule.interface';

export interface IStudio extends IBaseEntity {
    studioNumber: number;
    seatCapacity: number;
    movieSchedules: IMovieSchedule[];
}
