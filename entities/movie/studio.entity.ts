import { BaseEntity } from 'entities/base.entity';
import { IMovieSchedule } from 'interface-models/movie/movie-schedule.interface';
import { IStudio } from 'interface-models/movie/studio.interface';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MovieSchedule } from './movie-schedule.entity';

@Entity({ name: 'studios' })
export class Studio extends BaseEntity implements IStudio {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'int',
        nullable: false,
    })
    studioNumber: number;

    @Column({
        type: 'int',
        nullable: false,
    })
    seatCapacity: number;

    @OneToMany(() => MovieSchedule, (movieSchedule) => movieSchedule.studio, {
        cascade: true,
    })
    movieSchedules: IMovieSchedule[];
}
