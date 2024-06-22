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

import { TCTagFormProps } from 'apps/backoffice/@contracts/cinema/tag/tag-create.contract';
import { TCTagDetailProps } from 'apps/backoffice/@contracts/cinema/tag/tag-detail.contract';
import { TCTagIndexProps } from 'apps/backoffice/@contracts/cinema/tag/tag-index.contract';
import { TagCreateRequest } from '../requests/tag/tag-create.request';
import { TagEditRequest } from '../requests/tag/tag-edit.request';
import { TagIndexRequest } from '../requests/tag/tag-index.request';
import { TagResponse } from '../responses/tag-response';
import { TagService } from '../services/tag.service';
import { LoggedInGuard } from '../../auth/guards/logged-in.guard';

@Controller('tags')
@UseGuards(LoggedInGuard)
export class TagController {
    constructor(
        private readonly inertiaAdapter: InertiaAdapter,
        private readonly tagService: TagService,
    ) {}

    @Get()
    async indexPage(
        @Query() indexRequest: TagIndexRequest,
    ): Promise<TCTagIndexProps> {
        const response = await this.tagService.pagination(indexRequest);

        return this.inertiaAdapter.render('Cinema/Tag', {
            data: TagResponse.fromEntities(response.data),
            meta: response.meta,
        });
    }

    @Get('create')
    async createPage(): Promise<TCTagFormProps> {
        return this.inertiaAdapter.render('Cinema/Tag/Form', {});
    }

    @Get(':id')
    async detailPage(@Param('id') id: number): Promise<TCTagDetailProps> {
        const data = await this.tagService.findOneById(id);

        return this.inertiaAdapter.render('Cinema/Tag/Detail', {
            data: TagResponse.fromEntity(data),
        });
    }

    @Get('edit/:id')
    async getEditPage(@Param('id') id: number): Promise<TCTagFormProps> {
        const data = await this.tagService.findOneById(id);

        return this.inertiaAdapter.render('Cinema/Tag/Form', {
            id,
            data: TagResponse.fromEntity(data),
            isUpdate: true,
        });
    }

    @Post('create')
    async create(@Body() data: TagCreateRequest): Promise<void> {
        await this.tagService.create(data);
        this.inertiaAdapter.successResponse('tags', 'Tag Created Successfully');
    }

    @Put('edit/:id')
    async update(
        @Param('id') id: number,
        @Body() data: TagEditRequest,
    ): Promise<void> {
        await this.tagService.update(id, data);
        this.inertiaAdapter.successResponse('tags', 'Success update');
    }

    @Delete('delete/:id')
    async delete(@Param('id') id: number): Promise<void> {
        await this.tagService.delete(id);
        this.inertiaAdapter.successResponse('tags', 'Success delete');
    }

    @Post('bulk-delete')
    async bulkDelete(@Body('ids') ids: number[]): Promise<void> {
        await this.tagService.bulkDelete(ids);
        this.inertiaAdapter.successResponse('tags', 'Success bulk delete');
    }
}
