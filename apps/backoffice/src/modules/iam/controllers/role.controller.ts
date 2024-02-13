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
import { RoleCrudService } from '../services/role-crud.service';
import { RoleCreateRequest } from '../requests/role-create.request';
import { InertiaAdapter } from 'apps/backoffice/src/infrastructure/inertia/adapter/inertia.adapter';
import { RoleIndexRequest } from '../requests/role-index.request';
import { RoleEditRequest } from '../requests/role-edit.request';
import { PermissionGuard } from '../../auth/guards/permission.guard';
import {
    PERMISSION_BACKOFFICE_CREATE_ROLE,
    PERMISSION_BACKOFFICE_DELETE_ROLE,
    PERMISSION_BACKOFFICE_SHOW_ROLE,
    PERMISSION_BACKOFFICE_UPDATE_ROLE,
} from 'constants/permission.constant';
import { RoleResponse } from '../responses/role.response';
import { PermissionCrudService } from '../services/permission-crud.service';
import { TCRoleIndexProps } from 'apps/backoffice/@contracts/iam/role/role-index.contract';
import { TCRoleCreateProps } from 'apps/backoffice/@contracts/iam/role/role-create.contract';
import { TCRoleDetailProps } from 'apps/backoffice/@contracts/iam/role/role-detail.contract';
import { TCRoleEditProps } from 'apps/backoffice/@contracts/iam/role/role-edit.contract';

@Controller('roles')
export class RoleController {
    constructor(
        private readonly inertiaAdapter: InertiaAdapter,
        private readonly roleCrudService: RoleCrudService,
        private readonly permissionCrudService: PermissionCrudService,
    ) {}

    @UseGuards(PermissionGuard(PERMISSION_BACKOFFICE_SHOW_ROLE))
    @Get()
    async indexPage(
        @Query() indexRequest: RoleIndexRequest,
    ): Promise<TCRoleIndexProps> {
        const props = await this.roleCrudService.pagination(indexRequest);
        return this.inertiaAdapter.render('Iam/Roles', {
            data: props.data.map((role) => RoleResponse.fromEntity(role)),
            meta: props.meta,
        });
    }

    @UseGuards(PermissionGuard(PERMISSION_BACKOFFICE_CREATE_ROLE))
    @Get('create')
    async createPage(): Promise<TCRoleCreateProps> {
        const permissions = await this.permissionCrudService.findAll();
        return this.inertiaAdapter.render('Iam/Roles/CreateRole', {
            permissions,
        });
    }

    @UseGuards(PermissionGuard(PERMISSION_BACKOFFICE_SHOW_ROLE))
    @Get(':id')
    async detailPage(@Param('id') id: number): Promise<TCRoleDetailProps> {
        const data = await this.roleCrudService.findById(id);
        return this.inertiaAdapter.render('Iam/Roles/DetailRole', {
            data,
        });
    }

    @UseGuards(PermissionGuard(PERMISSION_BACKOFFICE_UPDATE_ROLE))
    @Get('edit/:id')
    async editPage(@Param('id') id: number): Promise<TCRoleEditProps> {
        const data = await this.roleCrudService.findById(id);
        const permissions = await this.permissionCrudService.findAll();

        return this.inertiaAdapter.render('Iam/Roles/EditRole', {
            data,
            permissions,
        });
    }

    @UseGuards(PermissionGuard(PERMISSION_BACKOFFICE_CREATE_ROLE))
    @Post('create')
    async store(@Body() roleCreateRequest: RoleCreateRequest): Promise<void> {
        await this.roleCrudService.create(roleCreateRequest);
        return this.inertiaAdapter.successResponse('roles', 'Success create');
    }

    @UseGuards(PermissionGuard(PERMISSION_BACKOFFICE_UPDATE_ROLE))
    @Put('edit/:id')
    async update(
        @Param('id') id: number,
        @Body() roleEditRequest: RoleEditRequest,
    ): Promise<void> {
        await this.roleCrudService.edit(id, roleEditRequest);
        return this.inertiaAdapter.successResponse('roles', 'Success edit');
    }

    @UseGuards(PermissionGuard(PERMISSION_BACKOFFICE_DELETE_ROLE))
    @Delete('delete/:id')
    async delete(@Param('id') id: number): Promise<void> {
        await this.roleCrudService.delete(id);
        return this.inertiaAdapter.successResponse('roles', 'Success delete');
    }
}
