import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { InertiaAdapter } from 'apps/backoffice/src/infrastructure/inertia/adapter/inertia.adapter';
import { PERMISSION_BACKOFFICE_SHOW_PERMISSION } from 'constants/permission.constant';
import { PermissionGuard } from '../../auth/guards/permission.guard';
import { PermissionCrudService } from '../services/permission-crud.service';
import { PermissionMapper } from '../mappers/permission.mapper';
import { PermissionIndexRequest } from '../requests/permission-index.request';

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
    ): Promise<void> {
        const pagination = await this.permissionCrudService.pagination(
            indexRequest,
        );

        return this.inertiaAdapter.render({
            component: 'Iam/Permissions',
            props: {
                data: pagination.data.map((permission) =>
                    PermissionMapper.fromEntity(permission),
                ),
                meta: pagination.meta,
            },
        });
    }

    @UseGuards(PermissionGuard(PERMISSION_BACKOFFICE_SHOW_PERMISSION))
    @Get(':id')
    async detailPage(@Param('id') id: number): Promise<void> {
        const data = await this.permissionCrudService.findById(id);
        return this.inertiaAdapter.render({
            component: 'Iam/Permissions/DetailPermission',
            props: { data },
        });
    }
}
