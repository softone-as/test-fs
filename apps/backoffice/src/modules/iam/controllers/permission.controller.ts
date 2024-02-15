import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { InertiaAdapter } from 'apps/backoffice/src/infrastructure/inertia/adapter/inertia.adapter';
import { PERMISSION_BACKOFFICE_SHOW_PERMISSION } from 'constants/permission.constant';
import { PermissionGuard } from '../../auth/guards/permission.guard';
import { PermissionCrudService } from '../services/permission-crud.service';
import { PermissionResponse } from '../responses/permission.response';
import { PermissionIndexRequest } from '../requests/permission-index.request';
import { TCPermissionIndexProps } from 'apps/backoffice/@contracts/iam/permission/permission-index.contract';
import { TCPermissionDetailProps } from 'apps/backoffice/@contracts/iam/permission/permission-detail.contract';

@Controller('permissions')
export class PermissionController {
    constructor(
        private readonly inertiaAdapter: InertiaAdapter,
        private readonly permissionCrudService: PermissionCrudService,
    ) {}

    @UseGuards(PermissionGuard(PERMISSION_BACKOFFICE_SHOW_PERMISSION))
    @Get()
    async indexPage(
        @Query() indexRequest: PermissionIndexRequest,
    ): Promise<TCPermissionIndexProps> {
        const pagination = await this.permissionCrudService.pagination(
            indexRequest,
        );

        return this.inertiaAdapter.render('Iam/Permissions', {
            data: pagination.data.map((permission) =>
                PermissionResponse.fromEntity(permission),
            ),
            meta: pagination.meta,
        });
    }

    @UseGuards(PermissionGuard(PERMISSION_BACKOFFICE_SHOW_PERMISSION))
    @Get(':id')
    async detailPage(
        @Param('id') id: number,
    ): Promise<TCPermissionDetailProps> {
        const data = await this.permissionCrudService.findById(id);
        return this.inertiaAdapter.render('Iam/Permissions/DetailPermission', {
            data,
        });
    }
}
