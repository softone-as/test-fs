import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginateResponse } from 'apps/backoffice/src/common/interface/index.interface';
import { PaginateUtil } from 'apps/backoffice/src/common/utils/paginate.util';
import { Movie } from 'entities/movie/movie.entity';
import { IMovie } from 'interface-models/movie/movie.interface';
import { Repository } from 'typeorm';
import { MovieIndexRequest } from '../requests/movie/movie-index.request';
import { Utils } from 'apps/backoffice/src/common/utils/util';

@Injectable()
export class MovieRepository extends Repository<Movie> {
    constructor(
        @InjectRepository(Movie)
        private readonly movieRepository: Repository<Movie>,
        private readonly paginationUtil: PaginateUtil,
    ) {
        super(
            movieRepository.target,
            movieRepository.manager,
            movieRepository.queryRunner,
        );
    }

    async pagination(
        request: MovieIndexRequest,
    ): Promise<IPaginateResponse<IMovie>> {
        const ALLOW_TO_SORT = ['latest', 'oldest', 'menu'];
        const query = this.movieRepository
            .createQueryBuilder('movie')
            .leftJoinAndSelect('movie.tags', 'tag');

        if (request.search) {
            query.andWhere(
                `concat(movie.title, ' ', movie.overview) like :search`,
                {
                    search: `%${request.search}%`,
                },
            );
        }

        if (request.tagId) {
            query.andWhere('tag.id = :tagId', { tagId: request.tagId });
        }

        if (request.playUntil) {
            const { startDate, endDate } = Utils.splitRangeDate(
                request.playUntil,
            );

            query.andWhere(
                '(DATE(movie.playUntil) BETWEEN DATE(:startDate) AND DATE(:endDate))',
                {
                    startDate,
                    endDate,
                },
            );
        }

        if (request.sort == 'latest') {
            query.orderBy('createdAt', 'DESC');
        } else if (request.sort == 'oldest') {
            query.orderBy('createdAt', 'ASC');
        } else {
            query.orderBy(
                ALLOW_TO_SORT.includes(request.sort)
                    ? `movie.${request.sort}`
                    : `movie.createdAt`,
                this.paginationUtil.getOrder(request.order),
            );
        }

        query.take(request.perPage ?? 10);
        query.skip(this.paginationUtil.countOffset(request));

        const [data, count] = await query.getManyAndCount();

        const meta = this.paginationUtil.mapMeta(count, request);

        const results = {
            data,
            meta,
        };

        return results;
    }

    async isMovieExists(title: string): Promise<boolean> {
        const movie = await this.movieRepository.findOne({
            where: { title },
        });
        return !!movie;
    }

    async bulkDelete(ids: number[]): Promise<void> {
        await this.movieRepository.delete(ids);
    }
}
