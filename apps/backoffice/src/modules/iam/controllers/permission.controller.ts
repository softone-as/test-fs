import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Query,
    UseGuards,
} from '@nestjs/common';
import { InertiaAdapter } from 'apps/backoffice/src/infrastructure/inertia/adapter/inertia.adapter';
import { PermissionIndexApplication } from '../applications/permission-index.application';
import { PermissionIndexRequest } from '../requests/permission-index.request';
import { PermissionEditRequest } from '../requests/permission-edit.request';
import { PermissionCrudApplication } from '../applications/permission-crud.application';
import {
    PERMISSION_BACKOFFICE_SHOW_PERMISSION,
    PERMISSION_BACKOFFICE_UPDATE_PERMISSION,
} from 'constants/permission.constant';
import { PermissionGuard } from '../../auth/guards/permission.guard';
import { PermissionMapper } from '../mappers/permission.mapper';

@Controller('permissions')
export class PermissionController {
    constructor(
        private readonly inertiaAdapter: InertiaAdapter,
        private readonly permissionCrudApplication: PermissionCrudApplication,
        private readonly permissionIndexApplication: PermissionIndexApplication,
    ) {}

    @UseGuards(PermissionGuard(PERMISSION_BACKOFFICE_SHOW_PERMISSION))
    @Get()
    async indexPage(
        @Query() indexRequest: PermissionIndexRequest,
    ): Promise<void> {
        const props = await this.permissionIndexApplication.fetch(indexRequest);
        return this.inertiaAdapter.render({
            component: 'Iam/Permissions',
            props: {
                ...props,
                data: props.data.map((permission) =>
                    PermissionMapper.fromEntity(permission),
                ),
            },
        });
    }

    @UseGuards(PermissionGuard(PERMISSION_BACKOFFICE_SHOW_PERMISSION))
    @Get(':id')
    async detailPage(@Param('id') id: number): Promise<void> {
        const data = await this.permissionCrudApplication.findById(id);
        return this.inertiaAdapter.render({
            component: 'Iam/Permissions/DetailPermission',
            props: { data, meta: null },
        });
    }

    @UseGuards(PermissionGuard(PERMISSION_BACKOFFICE_UPDATE_PERMISSION))
    @Get('edit/:id')
    async editPage(@Param('id') id: number): Promise<void> {
        const data = await this.permissionCrudApplication.findById(id);
        return this.inertiaAdapter.render({
            component: 'Iam/Permissions/FormPermission',
            props: {
                id,
                data,
                isUpdate: true,
            },
        });
    }

    // @UseGuards(PermissionGuard(PERMISSION_BACKOFFICE_UPDATE_PERMISSION), AbilityGuard)
    // @CheckAbilities({ action: Action.Create, subject: User }) // example to validate policy
    @UseGuards(PermissionGuard(PERMISSION_BACKOFFICE_UPDATE_PERMISSION))
    @Post('edit/:id')
    async update(
        @Param('id') id: number,
        @Body() permissionEditRequest: PermissionEditRequest,
    ): Promise<void> {
        await this.permissionCrudApplication.edit(id, permissionEditRequest);
        return this.inertiaAdapter.successResponse(
            'permissions',
            'Success edit',
        );
    }
}
