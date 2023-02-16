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
import { RoleCrudApplication } from '../applications/role-crud.application';
import { RoleCreateRequest } from '../requests/role-create.request';
import { InertiaAdapter } from 'apps/backoffice/src/infrastructure/inertia/adapter/inertia.adapter';
import { RoleIndexApplication } from '../applications/role-index.application';
import { RoleIndexRequest } from '../requests/role-index.request';
import { RoleEditRequest } from '../requests/role-edit.request';
import { PermissionGuard } from '../../auth/guards/permission.guard';
import {
    PERMISSION_BACKOFFICE_CREATE_ROLE,
    PERMISSION_BACKOFFICE_DELETE_ROLE,
    PERMISSION_BACKOFFICE_SHOW_ROLE,
    PERMISSION_BACKOFFICE_UPDATE_ROLE,
} from 'constants/permission.constant';
import { RoleMapper } from '../mappers/role.mapper';

@Controller('roles')
export class RoleController {
    constructor(
        private readonly inertiaAdapter: InertiaAdapter,
        private readonly roleCrudApplication: RoleCrudApplication,
        private readonly roleIndexApplication: RoleIndexApplication,
    ) {}

    @UseGuards(PermissionGuard(PERMISSION_BACKOFFICE_SHOW_ROLE))
    @Get()
    async indexPage(@Query() indexRequest: RoleIndexRequest): Promise<void> {
        const props = await this.roleIndexApplication.fetch(indexRequest);
        return this.inertiaAdapter.render({
            component: 'Iam/Roles',
            props: {
                ...props,
                data: props.data.map((role) => RoleMapper.fromEntity(role)),
            },
        });
    }

    @UseGuards(PermissionGuard(PERMISSION_BACKOFFICE_CREATE_ROLE))
    @Get('create')
    async createPage(): Promise<void> {
        return this.inertiaAdapter.render({
            component: 'Iam/Roles/CreateRole',
        });
    }

    @UseGuards(PermissionGuard(PERMISSION_BACKOFFICE_SHOW_ROLE))
    @Get(':id')
    async detailPage(@Param('id') id: number): Promise<void> {
        const data = await this.roleCrudApplication.findById(id);
        return this.inertiaAdapter.render({
            component: 'Iam/Roles/DetailRole',
            props: { data, meta: null },
        });
    }

    @UseGuards(PermissionGuard(PERMISSION_BACKOFFICE_UPDATE_ROLE))
    @Get('edit/:id')
    async editPage(@Param('id') id: number): Promise<void> {
        const data = await this.roleCrudApplication.findById(id);
        return this.inertiaAdapter.render({
            component: 'Iam/Roles/EditRole',
            props: {
                data,
            },
        });
    }

    @UseGuards(PermissionGuard(PERMISSION_BACKOFFICE_CREATE_ROLE))
    @Post('create')
    async store(@Body() roleCreateRequest: RoleCreateRequest): Promise<void> {
        await this.roleCrudApplication.create(roleCreateRequest);
        return this.inertiaAdapter.successResponse('roles', 'Success create');
    }

    @UseGuards(PermissionGuard(PERMISSION_BACKOFFICE_UPDATE_ROLE))
    @Put('edit/:id')
    async update(
        @Param('id') id: number,
        @Body() roleEditRequest: RoleEditRequest,
    ): Promise<void> {
        await this.roleCrudApplication.edit(id, roleEditRequest);
        return this.inertiaAdapter.successResponse('roles', 'Success edit');
    }

    @UseGuards(PermissionGuard(PERMISSION_BACKOFFICE_DELETE_ROLE))
    @Delete('delete/:id')
    async delete(@Param('id') id: number): Promise<void> {
        await this.roleCrudApplication.delete(id);
        return this.inertiaAdapter.successResponse('roles', 'Success delete');
    }
}
