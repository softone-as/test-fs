import { TCMovieDetailProps } from 'apps/backoffice/@contracts/movie/movie/movie-detail.contract';
import { IMovie } from 'interface-models/movie/movie.interface';

export class MovieResponse {
    public static readonly fromEntity = (
        movie: IMovie,
    ): TCMovieDetailProps['data'] => ({
        id: movie.id,
        title: movie.title,
        overview: movie.overview,
        poster: movie.poster,
        playUntil: movie.playUntil,
        tags: movie.tags,
        isTMDB: movie.isTMDB,
        movieSchedules: movie.movieSchedules,
    });

    static fromEntities(data: IMovie[]): TCMovieDetailProps['data'][] {
        return data.map((data) => this.fromEntity(data));
    }
}
