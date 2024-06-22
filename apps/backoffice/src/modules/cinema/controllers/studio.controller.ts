import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    UseGuards,
} from '@nestjs/common';
import { InertiaAdapter } from 'apps/backoffice/src/infrastructure/inertia/adapter/inertia.adapter';

import { TCStudioFormProps } from 'apps/backoffice/@contracts/cinema/studio/studio-create.contract';
import { TCStudioDetailProps } from 'apps/backoffice/@contracts/cinema/studio/studio-detail.contract';
import { TCStudioIndexProps } from 'apps/backoffice/@contracts/cinema/studio/studio-index.contract';
import { StudioCreateRequest } from '../requests/studio/studio-create.request';
import { StudioEditRequest } from '../requests/studio/studio-edit.request';
import { StudioIndexRequest } from '../requests/studio/studio-index.request';
import { StudioResponse } from '../responses/studio-response';
import { StudioService } from '../services/studio.service';
import { LoggedInGuard } from '../../auth/guards/logged-in.guard';

@Controller('studios')
@UseGuards(LoggedInGuard)
export class StudioController {
    constructor(
        private readonly inertiaAdapter: InertiaAdapter,
        private readonly studioService: StudioService,
    ) {}

    @Get()
    async indexPage(
        @Query() indexRequest: StudioIndexRequest,
    ): Promise<TCStudioIndexProps> {
        const response = await this.studioService.pagination(indexRequest);

        return this.inertiaAdapter.render('Cinema/Studio', {
            data: StudioResponse.fromEntities(response.data),
            meta: response.meta,
        });
    }

    @Get('create')
    async createPage(): Promise<TCStudioFormProps> {
        return this.inertiaAdapter.render('Cinema/Studio/Form', {});
    }

    @Get(':id')
    async detailPage(@Param('id') id: number): Promise<TCStudioDetailProps> {
        const data = await this.studioService.findOneById(id);

        return this.inertiaAdapter.render('Cinema/Studio/Detail', {
            data: StudioResponse.fromEntity(data),
        });
    }

    @Get('edit/:id')
    async getEditPage(@Param('id') id: number): Promise<TCStudioFormProps> {
        const data = await this.studioService.findOneById(id);

        return this.inertiaAdapter.render('Cinema/Studio/Form', {
            id,
            data: StudioResponse.fromEntity(data),
            isUpdate: true,
        });
    }

    @Post('create')
    async create(@Body() data: StudioCreateRequest): Promise<void> {
        await this.studioService.create(data);
        this.inertiaAdapter.successResponse(
            'studios',
            'Studio Created Successfully',
        );
    }

    @Put('edit/:id')
    async update(
        @Param('id') id: number,
        @Body() data: StudioEditRequest,
    ): Promise<void> {
        await this.studioService.update(id, data);
        this.inertiaAdapter.successResponse('studios', 'Success update');
    }

    @Delete('delete/:id')
    async delete(@Param('id') id: number): Promise<void> {
        await this.studioService.delete(id);
        this.inertiaAdapter.successResponse('studios', 'Success delete');
    }

    @Post('bulk-delete')
    async bulkDelete(@Body('ids') ids: number[]): Promise<void> {
        await this.studioService.bulkDelete(ids);
        this.inertiaAdapter.successResponse('studios', 'Success bulk delete');
    }
}
