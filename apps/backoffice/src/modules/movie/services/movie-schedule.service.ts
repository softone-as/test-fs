import { Injectable, NotFoundException } from '@nestjs/common';
import { IPaginateResponse } from 'apps/backoffice/src/common/interface/index.interface';
import { IMovieSchedule } from 'interface-models/movie/movie-schedule.interface';
import { In } from 'typeorm';
import { MovieScheduleRepository } from '../repositories/movie-schedule.repository';
import { MovieScheduleCreateRequest } from '../requests/movie-schedule/movie-schedule-create.request';
import { MovieScheduleEditRequest } from '../requests/movie-schedule/movie-schedule-edit.request';
import { MovieScheduleIndexRequest } from '../requests/movie-schedule/movie-schedule-index.request';
import { MovieService } from './movie.service';
import { StudioService } from './studio.service';
import { MovieSchedule } from 'entities/movie/movie-schedule.entity';

@Injectable()
export class MovieScheduleService {
    constructor(
        private readonly movieScheduleRepository: MovieScheduleRepository,
        private readonly movieService: MovieService,
        private readonly studioService: StudioService,
    ) {}

    async pagination(
        request: MovieScheduleIndexRequest,
    ): Promise<IPaginateResponse<IMovieSchedule>> {
        return this.movieScheduleRepository.pagination(request);
    }

    async findAll(): Promise<IMovieSchedule[]> {
        return await this.movieScheduleRepository.find({
            relations: ['movie', 'studio', 'orderItems'],
        });
    }

    async findOneById(id: number): Promise<IMovieSchedule> {
        return await this.movieScheduleRepository.findOneOrFail({
            where: { id },
            relations: ['movie', 'studio', 'orderItems'],
        });
    }

    async findByIds(ids: number[]): Promise<IMovieSchedule[]> {
        return await this.movieScheduleRepository.find({
            where: {
                id: In(ids),
            },
            relations: ['movie', 'studio', 'orderItems'],
        });
    }

    async create(data: MovieScheduleCreateRequest): Promise<void> {
        const movie = await this.movieService.findOneById(data.movieId);
        const studio = await this.studioService.findOneById(data.studioId);

        if (!movie || !studio) {
            throw new Error('Movie or Studio not found');
        }

        const movieSchedule = new MovieSchedule();
        movieSchedule.movie = movie;
        movieSchedule.studio = studio;
        movieSchedule.startTime = data.startTime.toString();
        movieSchedule.endTime = data.endTime.toString();
        movieSchedule.date = data.date;
        movieSchedule.price = data.price;

        this.movieScheduleRepository.create(movieSchedule);
        await this.movieScheduleRepository.save(movieSchedule);
    }

    async delete(movieScheduleId: number): Promise<void> {
        const movieSchedule = await this.movieScheduleRepository.findOne({
            where: { id: movieScheduleId },
        });

        if (!movieSchedule) {
            throw new NotFoundException(
                `MovieSchedule with ID ${movieScheduleId} not found`,
            );
        }

        // Now delete the movieSchedule
        await this.movieScheduleRepository.remove(movieSchedule);
    }

    async bulkDelete(ids: number[]): Promise<void> {
        await this.movieScheduleRepository.bulkDelete(ids);
    }

    async update(id: number, request: MovieScheduleEditRequest): Promise<void> {
        const movieSchedule = await this.movieScheduleRepository.findOne({
            where: { id },
            relations: ['movie', 'studio', 'orderItems'],
        });

        if (!movieSchedule) {
            throw new NotFoundException(
                `MovieSchedule with ID ${id} not found`,
            );
        }

        this.movieScheduleRepository.merge(movieSchedule, {
            ...request,
            startTime: request.startTime.toString(),
            endTime: request.endTime.toString(),
        });
        await this.movieScheduleRepository.save(movieSchedule);
    }
}
