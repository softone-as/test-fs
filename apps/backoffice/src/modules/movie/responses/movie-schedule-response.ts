import { TCMovieScheduleDetailProps } from 'apps/backoffice/@contracts/movie/movie-schedule/movie-schedule-detail.contract';
import { IMovieSchedule } from 'interface-models/movie/movie-schedule.interface';

export class MovieScheduleResponse {
    public static readonly fromEntity = (
        movieSchedule: IMovieSchedule,
    ): TCMovieScheduleDetailProps['data'] => ({
        id: movieSchedule.id,
        date: movieSchedule.date,
        studio: movieSchedule.studio,
        movie: movieSchedule.movie,
        startTime: movieSchedule.startTime,
        endTime: movieSchedule.endTime,
        price: movieSchedule.price,
        orderItems: movieSchedule?.orderItems ?? [],
        createdAt: movieSchedule.createdAt,
        updatedAt: movieSchedule.updatedAt,
    });

    static fromEntities(
        data: IMovieSchedule[],
    ): TCMovieScheduleDetailProps['data'][] {
        return data.map((data) => this.fromEntity(data));
    }
}
