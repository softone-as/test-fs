import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { InertiaAdapter } from 'apps/backoffice/src/infrastructure/inertia/adapter/inertia.adapter';

import { MovieCreateRequest } from '../requests/movie/movie-create.request';
import { MovieService } from '../services/movie.service';
import { MovieIndexRequest } from '../requests/movie/movie-index.request';
import {
    MovieBulkUpdatePlayUntilRequest,
    MovieEditRequest,
} from '../requests/movie/movie-edit.request';
import { TCMovieFormProps } from 'apps/backoffice/@contracts/movie/movie/movie-create.contract';
import { TCMovieDetailProps } from 'apps/backoffice/@contracts/movie/movie/movie-detail.contract';
import { MovieResponse } from '../responses/movie.response';
import { TCMovieIndexProps } from 'apps/backoffice/@contracts/movie/movie/movie-index.contract';
import { TagService } from '../services/tag.service';
import { Utils } from 'apps/backoffice/src/common/utils/util';
import { ITag } from 'interface-models/movie/tag.interface';
import { LoggedInGuard } from '../../auth/guards/logged-in.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { PermissionGuard } from '../../auth/guards/permission.guard';
import {
    PERMISSION_BACKOFFICE_CREATE_MOVIE,
    PERMISSION_BACKOFFICE_DELETE_MOVIE,
    PERMISSION_BACKOFFICE_DETAIL_MOVIE,
    PERMISSION_BACKOFFICE_SHOW_MOVIE,
    PERMISSION_BACKOFFICE_SYNC_MOVIE,
    PERMISSION_BACKOFFICE_UPDATE_MOVIE,
} from 'constants/permission.constant';

@Controller('movies')
@UseGuards(LoggedInGuard)
export class MovieController {
    constructor(
        private readonly inertiaAdapter: InertiaAdapter,
        private readonly movieService: MovieService,
        private readonly tagService: TagService,
    ) {}

    @UseGuards(PermissionGuard(PERMISSION_BACKOFFICE_SHOW_MOVIE))
    @Get()
    async indexPage(
        @Query() indexRequest: MovieIndexRequest,
    ): Promise<TCMovieIndexProps> {
        const [movieResponse, tags] = await Promise.all([
            this.movieService.pagination(indexRequest),
            this.tagService.findAll(),
        ]);

        return this.inertiaAdapter.render('Movie', {
            data: MovieResponse.fromEntities(movieResponse.data),
            meta: movieResponse.meta,
            tags: Utils.transformToOption<ITag>(tags),
        });
    }

    @UseGuards(PermissionGuard(PERMISSION_BACKOFFICE_CREATE_MOVIE))
    @Get('create')
    async createPage(): Promise<TCMovieFormProps> {
        const tags = await this.tagService.findAll();
        return this.inertiaAdapter.render('Movie/Form', {
            tags: Utils.transformToOption<ITag>(tags),
        });
    }

    @UseGuards(PermissionGuard(PERMISSION_BACKOFFICE_DETAIL_MOVIE))
    @Get(':id')
    async detailPage(@Param('id') id: number): Promise<TCMovieDetailProps> {
        const data = await this.movieService.findOneById(id);

        return this.inertiaAdapter.render('Movie/Detail', {
            data: MovieResponse.fromEntity(data),
        });
    }

    @UseGuards(PermissionGuard(PERMISSION_BACKOFFICE_UPDATE_MOVIE))
    @Get('edit/:id')
    async getEditPage(@Param('id') id: number): Promise<TCMovieFormProps> {
        const [movieResponse, tags] = await Promise.all([
            this.movieService.findOneById(id),
            this.tagService.findAll(),
        ]);

        return this.inertiaAdapter.render('Movie/Form', {
            id,
            data: MovieResponse.fromEntity(movieResponse),
            tags: Utils.transformToOption<ITag>(tags),
            isUpdate: true,
        });
    }

    @UseGuards(PermissionGuard(PERMISSION_BACKOFFICE_SYNC_MOVIE))
    @Post('sync')
    async sync(): Promise<void> {
        await this.movieService.fetchNowPlayingMovies();
        this.inertiaAdapter.successResponse('movies', 'Success sync');
    }

    @UseGuards(PermissionGuard(PERMISSION_BACKOFFICE_CREATE_MOVIE))
    @Post('create')
    @UseInterceptors(FileInterceptor('poster', Utils.getStorageMulterConfig()))
    async create(
        @Body() data: MovieCreateRequest,
        @UploadedFile() poster: Express.Multer.File,
    ): Promise<void> {
        await this.movieService.create(data, poster);
        this.inertiaAdapter.successResponse(
            'movies',
            'Movie Created Successfully',
        );
    }

    @UseGuards(PermissionGuard(PERMISSION_BACKOFFICE_UPDATE_MOVIE))
    @Put('edit/:id')
    @UseInterceptors(FileInterceptor('poster', Utils.getStorageMulterConfig()))
    async update(
        @Param('id') id: number,
        @Body() data: MovieEditRequest,
        @UploadedFile() poster: Express.Multer.File,
    ): Promise<void> {
        await this.movieService.update(id, data, poster);
        this.inertiaAdapter.successResponse('movies', 'Success update');
    }

    @UseGuards(PermissionGuard(PERMISSION_BACKOFFICE_DELETE_MOVIE))
    @Delete('delete/:id')
    async delete(@Param('id') id: number): Promise<void> {
        await this.movieService.delete(id);
        this.inertiaAdapter.successResponse('movies', 'Success delete');
    }
    @UseGuards(PermissionGuard(PERMISSION_BACKOFFICE_DELETE_MOVIE))
    @Post('bulk-delete')
    async bulkDelete(@Body('ids') ids: number[]): Promise<void> {
        await this.movieService.bulkDelete(ids);
        this.inertiaAdapter.successResponse('movies', 'Success bulk delete');
    }

    @Post('bulk-update-play-until')
    async bulkUpdatePlayUntil(
        @Body() request: MovieBulkUpdatePlayUntilRequest,
    ): Promise<void> {
        await this.movieService.bulkUpdatePlayUntil(request);
        this.inertiaAdapter.successResponse('movies', 'Success bulk update');
    }
}
