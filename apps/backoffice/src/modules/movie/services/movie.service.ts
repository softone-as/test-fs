import {
    Injectable,
    Logger,
    UnprocessableEntityException,
} from '@nestjs/common';
import { IPaginateResponse } from 'apps/backoffice/src/common/interface/index.interface';
import { MovieRepository } from '../repositories/movie.repository';
import { MovieIndexRequest } from '../requests/movie/movie-index.request';
import { IMovie } from 'interface-models/movie/movie.interface';
import { MovieCreateRequest } from '../requests/movie/movie-create.request';
import { Movie } from 'entities/movie/movie.entity';
import { TagService } from './tag.service';
import { catchError, firstValueFrom } from 'rxjs';
import { config } from 'apps/backoffice/src/config';
import { TMovieTMDBResponse } from 'apps/backoffice/@contracts/movie/movie/movie-index.contract';
import { HttpService } from '@nestjs/axios';
import { AxiosError } from 'axios';
import { truncate } from 'apps/backoffice/app/Utils/utils';
import { Utils } from 'apps/backoffice/src/common/utils/util';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import {
    MovieBulkUpdatePlayUntilRequest,
    UpdatePlayUntilRequest,
} from '../requests/movie/movie-edit.request';
import {
    QUEUE_MOVIE,
    QUEUE_MOVIE_BULK_UPDATE_PLAY_UNTIL,
} from '../queues/movie-queue.constants';

@Injectable()
export class MovieService {
    constructor(
        @InjectQueue(QUEUE_MOVIE)
        private readonly movieQueue: Queue,

        private readonly httpService: HttpService,

        private readonly movieRepository: MovieRepository,
        private readonly tagService: TagService,
    ) {}

    private logger: Logger = new Logger(MovieService.name);

    async pagination(
        request: MovieIndexRequest,
    ): Promise<IPaginateResponse<IMovie>> {
        return this.movieRepository.pagination(request);
    }

    async findAll(): Promise<IMovie[]> {
        return await this.movieRepository.find({
            relations: ['tags', 'movieSchedules'],
        });
    }

    async findOneById(id: number): Promise<IMovie> {
        return await this.movieRepository.findOneOrFail({
            where: { id },
            relations: ['tags'],
        });
    }

    async create(
        data: MovieCreateRequest,
        poster?: Express.Multer.File,
    ): Promise<void> {
        const movieExists = await this.movieRepository.isMovieExists(
            data.title,
        );

        if (movieExists) {
            throw new UnprocessableEntityException(
                `Movie ${data.title} has already exists`,
            );
        }

        const tags = await this.tagService.findByIds(data.tags);

        if (tags.length === 0) {
            throw new UnprocessableEntityException(`Tags not found`);
        }

        if (poster) {
            const uploadUrl = await Utils.moveFile(
                poster?.path,
                '/' + Date.now() + '-' + poster.originalname,
            );
            data.poster = uploadUrl;
        }

        const newMovie = new Movie();
        newMovie.title = data.title;
        newMovie.overview = data.overview;
        newMovie.poster = data.poster as string;
        newMovie.playUntil = data.playUntil;
        newMovie.tags = tags;

        await this.movieRepository.save(newMovie);
    }

    async delete(id: number): Promise<void> {
        await this.movieRepository.delete(id);
    }

    async bulkDelete(ids: number[]): Promise<void> {
        await this.movieRepository.bulkDelete(ids);
    }

    async update(
        id: number,
        request: MovieCreateRequest,
        poster?: Express.Multer.File,
    ): Promise<void> {
        const movie = await this.movieRepository.findOne({
            where: { id },
            relations: ['tags'],
        });

        if (!movie) {
            throw new UnprocessableEntityException(
                `Movie ${request.title} not found`,
            );
        }

        const tags = await this.tagService.findByIds(request.tags);

        if (tags.length === 0) {
            throw new UnprocessableEntityException(`Tags not found`);
        }

        if (poster) {
            const uploadUrl = await Utils.moveFile(
                poster?.path,
                '/' + Date.now() + '-' + poster.originalname,
            );
            movie.poster = uploadUrl;
        }

        movie.title = request.title;
        movie.overview = request.overview;
        movie.playUntil = request.playUntil;
        movie.tags = tags;

        await this.movieRepository.save(movie);
    }

    @Cron(CronExpression.EVERY_WEEK)
    async fetchNowPlayingMovies(): Promise<void> {
        this.logger.debug('Fetching now playing movies...');

        const { data } = await firstValueFrom(
            this.httpService
                .get<TMovieTMDBResponse>(
                    `${config.api.tmdb}/movie/now_playing`,
                    {
                        headers: {
                            Authorization: `Bearer ${config.api.tmdbApiToken}`,
                            Accept: 'application/json',
                        },
                        params: {
                            page: 1,
                            language: 'en-US',
                        },
                    },
                )
                .pipe(
                    catchError((error: AxiosError) => {
                        this.logger.error(
                            'Failed to fetch now playing movies',
                            error.stack,
                        );

                        throw new Error('Failed to fetch now playing movies');
                    }),
                ),
        );

        for (const movie of data.results) {
            const newMovie = this.movieRepository.create({
                title: movie.title,
                playUntil: data.dates.maximum,
                overview:
                    movie.overview.length < 255
                        ? movie.overview
                        : truncate(movie.overview, 250),
                poster: movie.poster_path,
                tags: [],
                isTMDB: true,
            });

            await this.movieRepository.save(newMovie);
        }

        this.logger.debug('Fetched and saved now playing movies.');
    }

    async bulkUpdatePlayUntil(
        request: MovieBulkUpdatePlayUntilRequest,
    ): Promise<void> {
        for (const id of request.ids) {
            try {
                await this.movieQueue.add(
                    QUEUE_MOVIE_BULK_UPDATE_PLAY_UNTIL,
                    {
                        id,
                        playUntil: request.playUntil,
                    },
                    {
                        attempts: 3,
                    },
                );
            } catch (error) {
                this.logger.error('Failed to add job to queue', error);
            }
        }
    }

    async processBulkUpdatePlayUntil(
        job: UpdatePlayUntilRequest,
    ): Promise<void> {
        const movie = await this.movieRepository.findOneOrFail({
            where: { id: job.id },
        });

        movie.playUntil = job.playUntil;

        await this.movieRepository.save(movie);
    }
}
