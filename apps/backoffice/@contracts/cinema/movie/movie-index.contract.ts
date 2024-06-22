import { IPaginateResponse } from 'apps/backoffice/src/common/interface/index.interface';
import { IFilterOption } from 'apps/backoffice/src/common/interface/response.interface';
import { IndexRequestSchema } from 'apps/backoffice/src/common/request/index.request';
import { IMovie } from 'interface-models/movie/movie.interface';
import { z } from 'zod';

export const MovieIndexSchema = IndexRequestSchema.extend({
    tagId: z.coerce.number().optional(),
    playUntil: z.string().optional(),
});

export type TMovieIndexSchema = z.infer<typeof MovieIndexSchema>;

export type TCMovieIndexProps = IPaginateResponse<IMovie> & {
    tags: IFilterOption[];
};

export type TMovieTMDB = {
    id: number;
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: Date;
    title: string;
    video: false;
    vote_average: number;
    vote_count: 849;
};

export type TMovieTMDBResponse = {
    dates: {
        maximum: Date;
        minimum: Date;
    };
    page: number;
    results: TMovieTMDB[];
    total_pages: number;
    total_results: number;
};
