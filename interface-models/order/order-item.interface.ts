import { IBaseEntity } from 'interface-models/base-entity.interface';
import { IOrder } from './order.interface';
import { IMovieSchedule } from 'interface-models/movie/movie-schedule.interface';

export interface IOrderItem extends IBaseEntity {
    qty: number;
    price: number;
    subTotalPrice: number;
    snapshots: string[];
    order: IOrder;
    movieSchedule: IMovieSchedule;
}
