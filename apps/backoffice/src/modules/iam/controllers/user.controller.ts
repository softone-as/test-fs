import {
    Body,
    Controller,
    Get,
    Logger,
    Param,
    Post,
    Put,
    Query,
    UseGuards,
} from '@nestjs/common';
import { UserCrudService } from '../services/user-crud.service';
import { RoleCrudService } from '../services/role-crud.service';
import { UserCreateRequest } from '../requests/user-create.request';
import { InertiaAdapter } from '../../../infrastructure/inertia/adapter/inertia.adapter';
import { UserIndexRequest } from '../requests/user-index.request';
import {
    PERMISSION_BACKOFFICE_CREATE_USER,
    PERMISSION_BACKOFFICE_DELETE_USER,
    PERMISSION_BACKOFFICE_SHOW_USER,
    PERMISSION_BACKOFFICE_UPDATE_USER,
} from '../../../../../../constants/permission.constant';
import { PermissionGuard } from '../../auth/guards/permission.guard';
import { UserUpdateRequest } from '../requests/user-update.request';
import { UserBulkDeleteRequest } from '../requests/user-bulk-delete.request';
import { UserResponse } from '../responses/user.response';
import { TCUserDetailProps } from 'apps/backoffice/@contracts/iam/user/user-detail.contract';
import { TCUserEditProps } from 'apps/backoffice/@contracts/iam/user/user-edit.contract';
import { TCUserIndexProps } from 'apps/backoffice/@contracts/iam/user/user-index.contract';
import { TCUserCreateProps } from 'apps/backoffice/@contracts/iam/user/user-create.contract';

@Controller('users')
export class UserController {
    constructor(
        private readonly inertiaAdapter: InertiaAdapter,
        private readonly userCrudService: UserCrudService,
        private readonly roleCrudApplication: RoleCrudService,
    ) {}

    @UseGuards(PermissionGuard(PERMISSION_BACKOFFICE_SHOW_USER))
    @Get()
    async indexPage(
        @Query() indexRequest: UserIndexRequest,
    ): Promise<TCUserIndexProps> {
        const users = await this.userCrudService.pagination(indexRequest);

        Logger.debug('User data');

        return this.inertiaAdapter.render('Iam/Users', {
            data: users.data.map((user) => UserResponse.fromEntity(user)),
            meta: users.meta,
        });
    }

    @UseGuards(PermissionGuard(PERMISSION_BACKOFFICE_SHOW_USER))
    @Get('create')
    async createPage(): Promise<TCUserCreateProps> {
        const roles = await this.roleCrudApplication.findAll();

        return this.inertiaAdapter.render('Iam/Users/FormUser', {
            roles,
        });
    }

    @UseGuards(PermissionGuard(PERMISSION_BACKOFFICE_SHOW_USER))
    @Get(':id')
    async detailPage(@Param('id') id: number): Promise<TCUserDetailProps> {
        const data = await this.userCrudService.findById(id);
        return this.inertiaAdapter.render('Iam/Users/DetailUser', { data });
    }

    @UseGuards(PermissionGuard(PERMISSION_BACKOFFICE_UPDATE_USER))
    @Get('edit/:id')
    async editPage(@Param('id') id: number): Promise<TCUserEditProps> {
        const data = await this.userCrudService.findById(id);
        const roles = await this.roleCrudApplication.findAll();
        return this.inertiaAdapter.render('Iam/Users/FormUser', {
            id,
            data,
            roles,
            isUpdate: true,
        });
    }

    @UseGuards(PermissionGuard(PERMISSION_BACKOFFICE_CREATE_USER))
    @Post('create')
    async store(@Body() userCreateRequest: UserCreateRequest): Promise<void> {
        await this.userCrudService.create(userCreateRequest);
        this.inertiaAdapter.successResponse('users', 'Success create');
    }

    @UseGuards(PermissionGuard(PERMISSION_BACKOFFICE_UPDATE_USER))
    @Put('edit/:id')
    async update(
        @Param('id') id: number,
        @Body() userUpdateRequest: UserUpdateRequest,
    ): Promise<void> {
        await this.userCrudService.update(id, userUpdateRequest);
        this.inertiaAdapter.successResponse('users', 'Success update');
    }

    @UseGuards(PermissionGuard(PERMISSION_BACKOFFICE_DELETE_USER))
    @Post('delete/:id')
    async delete(@Param('id') id: number): Promise<void> {
        await this.userCrudService.delete(id);
        this.inertiaAdapter.successResponse('users', 'Success delete');
    }

    @UseGuards(PermissionGuard(PERMISSION_BACKOFFICE_DELETE_USER))
    @Post('deletes')
    async batchDelete(@Body() request: UserBulkDeleteRequest): Promise<void> {
        await this.userCrudService.bulkDelete(request.ids);
        this.inertiaAdapter.successResponse('users', 'Success delete');
    }
}
