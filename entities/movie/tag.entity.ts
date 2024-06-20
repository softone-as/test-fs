import { BaseEntity } from 'entities/base.entity';
import { IMovie } from 'interface-models/movie/movie.interface';
import { ITag } from 'interface-models/movie/tag.interface';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Movie } from './movie.entity';

@Entity({ name: 'tags' })
export class Tag extends BaseEntity implements ITag {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: false,
    })
    name: string;

    @ManyToMany(() => Movie, (movie) => movie.tags)
    movies: IMovie[];
}
