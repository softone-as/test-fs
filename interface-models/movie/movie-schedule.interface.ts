import { IBaseEntity } from 'interface-models/base-entity.interface';
import { IMovie } from './movie.interface';
import { IStudio } from './studio.interface';
import { IOrderItem } from 'interface-models/order/order-item.interface';

export interface IMovieSchedule extends IBaseEntity {
    movie: IMovie;
    studio: IStudio;
    startTime: string;
    endTime: string;
    price: number;
    date: Date;
    orderItems: IOrderItem[];
}
