import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
} from '@nestjs/common';
import { InertiaAdapter } from 'apps/backoffice/src/infrastructure/inertia/adapter/inertia.adapter';

import { TCMovieScheduleFormProps } from 'apps/backoffice/@contracts/cinema/movie-schedule/movie-schedule-create.contract';
import { TCMovieScheduleDetailProps } from 'apps/backoffice/@contracts/cinema/movie-schedule/movie-schedule-detail.contract';
import { TCMovieScheduleIndexProps } from 'apps/backoffice/@contracts/cinema/movie-schedule/movie-schedule-index.contract';
import { MovieScheduleCreateRequest } from '../requests/movie-schedule/movie-schedule-create.request';
import { MovieScheduleEditRequest } from '../requests/movie-schedule/movie-schedule-edit.request';
import { MovieScheduleIndexRequest } from '../requests/movie-schedule/movie-schedule-index.request';
import { MovieScheduleResponse } from '../responses/movie-schedule-response';
import { MovieScheduleService } from '../services/movie-schedule.service';
import { MovieService } from '../services/movie.service';
import { StudioService } from '../services/studio.service';
import { Utils } from 'apps/backoffice/src/common/utils/util';
import { IStudio } from 'interface-models/movie/studio.interface';
import { IMovie } from 'interface-models/movie/movie.interface';

const movieOptionFields = {
    label: 'title',
    value: 'id',
};

const studioOptionFields = {
    label: 'studioNumber',
    value: 'id',
};

@Controller('movie-schedules')
// @UseGuards(LoggedInGuard)
export class MovieScheduleController {
    constructor(
        private readonly inertiaAdapter: InertiaAdapter,
        private readonly movieScheduleService: MovieScheduleService,
        private readonly movieService: MovieService,
        private readonly studioService: StudioService,
    ) {}

    @Get()
    async indexPage(
        @Query() indexRequest: MovieScheduleIndexRequest,
    ): Promise<TCMovieScheduleIndexProps> {
        const [moviesSchedule, studios] = await Promise.all([
            this.movieScheduleService.pagination(indexRequest),
            this.studioService.findAll(),
        ]);

        return this.inertiaAdapter.render('Cinema/MovieSchedule', {
            data: MovieScheduleResponse.fromEntities(moviesSchedule.data),
            meta: moviesSchedule.meta,
            studios: Utils.transformToOption<IStudio>(
                studios,
                studioOptionFields,
            ),
        });
    }

    @Get('create')
    async createPage(): Promise<TCMovieScheduleFormProps> {
        const [movies, studios] = await Promise.all([
            this.movieService.findAll(),
            this.studioService.findAll(),
        ]);

        return this.inertiaAdapter.render('Cinema/MovieSchedule/Form', {
            movies: Utils.transformToOption<IMovie>(movies, movieOptionFields),
            studios: Utils.transformToOption<IStudio>(
                studios,
                studioOptionFields,
            ),
        });
    }

    @Get(':id')
    async detailPage(
        @Param('id') id: number,
    ): Promise<TCMovieScheduleDetailProps> {
        const data = await this.movieScheduleService.findOneById(id);

        return this.inertiaAdapter.render('Cinema/MovieSchedule/Detail', {
            data: MovieScheduleResponse.fromEntity(data),
        });
    }

    @Get('edit/:id')
    async getEditPage(
        @Param('id') id: number,
    ): Promise<TCMovieScheduleFormProps> {
        const [movieSchedule, movies, studios] = await Promise.all([
            this.movieScheduleService.findOneById(id),
            this.movieService.findAll(),
            this.studioService.findAll(),
        ]);

        return this.inertiaAdapter.render('Cinema/MovieSchedule/Form', {
            id,
            isUpdate: true,
            data: MovieScheduleResponse.fromEntity(movieSchedule),
            movies: Utils.transformToOption<IMovie>(movies, movieOptionFields),
            studios: Utils.transformToOption<IStudio>(
                studios,
                studioOptionFields,
            ),
        });
    }

    @Post('create')
    async create(@Body() data: MovieScheduleCreateRequest): Promise<void> {
        await this.movieScheduleService.create(data);
        this.inertiaAdapter.successResponse(
            'movie-schedules',
            'MovieSchedule Created Successfully',
        );
    }

    @Put('edit/:id')
    async update(
        @Param('id') id: number,
        @Body() data: MovieScheduleEditRequest,
    ): Promise<void> {
        await this.movieScheduleService.update(id, data);
        this.inertiaAdapter.successResponse(
            'movie-schedules',
            'Success update',
        );
    }

    @Delete('delete/:id')
    async delete(@Param('id') id: number): Promise<void> {
        await this.movieScheduleService.delete(id);
        this.inertiaAdapter.successResponse(
            'movie-schedules',
            'Success delete',
        );
    }

    @Post('bulk-delete')
    async bulkDelete(@Body('ids') ids: number[]): Promise<void> {
        await this.movieScheduleService.bulkDelete(ids);
        this.inertiaAdapter.successResponse(
            'movie-schedules',
            'Success bulk delete',
        );
    }
}
