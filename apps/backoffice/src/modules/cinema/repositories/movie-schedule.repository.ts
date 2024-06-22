import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginateResponse } from 'apps/backoffice/src/common/interface/index.interface';
import { PaginateUtil } from 'apps/backoffice/src/common/utils/paginate.util';
import { MovieSchedule } from 'entities/movie/movie-schedule.entity';
import { IMovieSchedule } from 'interface-models/movie/movie-schedule.interface';
import { Repository } from 'typeorm';
import { MovieScheduleIndexRequest } from '../requests/movie-schedule/movie-schedule-index.request';

@Injectable()
export class MovieScheduleRepository extends Repository<MovieSchedule> {
    constructor(
        @InjectRepository(MovieSchedule)
        private readonly movieScheduleRepository: Repository<MovieSchedule>,
        private readonly paginationUtil: PaginateUtil,
    ) {
        super(
            movieScheduleRepository.target,
            movieScheduleRepository.manager,
            movieScheduleRepository.queryRunner,
        );
    }

    async pagination(
        request: MovieScheduleIndexRequest,
    ): Promise<IPaginateResponse<IMovieSchedule>> {
        const ALLOW_TO_SORT = ['latest', 'oldest', 'menu'];
        const query = this.movieScheduleRepository
            .createQueryBuilder('movieSchedule')
            .leftJoinAndSelect('movieSchedule.studio', 'studio')
            .leftJoinAndSelect('movieSchedule.movie', 'movie')
            .leftJoinAndSelect('movieSchedule.orderItems', 'orderItems');

        if (request.search) {
            query.andWhere(
                `concat(movie.title, ' ', movie.overview) like :search`,
                {
                    search: `%${request.search}%`,
                },
            );
        }

        if (request.studioId) {
            query.andWhere('studio.id = :studioId', {
                studioId: request.studioId,
            });
        }

        if (request.date) {
            query.andWhere('DATE(movieSchedule.date) = :date', {
                date: request.date,
            });
        }

        if (request.sort == 'latest') {
            query.orderBy('createdAt', 'DESC');
        } else if (request.sort == 'oldest') {
            query.orderBy('createdAt', 'ASC');
        } else {
            query.orderBy(
                ALLOW_TO_SORT.includes(request.sort)
                    ? `movieSchedule.${request.sort}`
                    : `movieSchedule.createdAt`,
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

    async bulkDelete(ids: number[]): Promise<void> {
        await this.movieScheduleRepository.delete(ids);
    }
}
