import { BaseEntity } from 'entities/base.entity';
import { IMovie } from 'interface-models/movie/movie.interface';
import { ITag } from 'interface-models/movie/tag.interface';
import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Tag } from './tag.entity';
import { IMovieSchedule } from 'interface-models/movie/movie-schedule.interface';
import { MovieSchedule } from './movie-schedule.entity';

@Entity({ name: 'movies' })
export class Movie extends BaseEntity implements IMovie {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: false,
    })
    title: string;

    @Column({
        name: 'play_until',
        type: 'timestamp',
        nullable: false,
    })
    playUntil: Date;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: false,
    })
    overview: string;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: false,
    })
    poster: string;

    @Column({
        type: 'boolean',
        default: false,
    })
    isTMDB: boolean;

    @ManyToMany(() => Tag, (tag) => tag.movies, {
        cascade: ['insert', 'update'],
    })
    @JoinTable({
        name: 'movie_tags',
        joinColumn: {
            name: 'movie_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'tag_id',
            referencedColumnName: 'id',
        },
    })
    tags: ITag[];

    @OneToMany(() => MovieSchedule, (movieSchedule) => movieSchedule.movie)
    movieSchedules: IMovieSchedule[];
}
