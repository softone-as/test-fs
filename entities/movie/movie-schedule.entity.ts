import { BaseEntity } from 'entities/base.entity';
import { IMovieSchedule } from 'interface-models/movie/movie-schedule.interface';
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Movie } from './movie.entity';
import { IMovie } from 'interface-models/movie/movie.interface';
import { IStudio } from 'interface-models/movie/studio.interface';
import { Studio } from './studio.entity';
import { IOrderItem } from 'interface-models/order/order-item.interface';
import { OrderItem } from 'entities/order/order-item.entity';

@Entity({ name: 'movie_schedules' })
export class MovieSchedule extends BaseEntity implements IMovieSchedule {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: false,
    })
    startTime: string;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: false,
    })
    endTime: string;

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        nullable: false,
    })
    price: number;

    @Column({
        type: 'timestamp',
        nullable: false,
    })
    date: Date;

    @ManyToOne(() => Movie, (movie) => movie.movieSchedules)
    @JoinColumn({ name: 'movie_id' })
    movie: IMovie;

    @ManyToOne(() => Studio, (studio) => studio.movieSchedules)
    @JoinColumn({ name: 'studio_id' })
    studio: IStudio;

    @OneToMany(() => OrderItem, (orderItem) => orderItem.movieSchedule)
    orderItems: IOrderItem[];
}
