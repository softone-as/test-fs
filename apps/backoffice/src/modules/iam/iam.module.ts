import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'entities/iam/user.entity';
import { InertiaAdapter } from '../../infrastructure/inertia/adapter/inertia.adapter';
import { UserCrudApplication } from './applications/user-crud.application';
import { UserIndexApplication } from './applications/user-index.application';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { RoleCrudApplication } from './applications/role-crud.application';
import { RoleIndexApplication } from './applications/role-index.application';
import { RoleController } from './controllers/role.controller';
import { RoleService } from './services/role.service';
import { Role } from 'entities/iam/role.entity';
import { PermissionCrudApplication } from './applications/permission-crud.application';
import { PermissionService } from './services/permission.service';
import { PermissionIndexApplication } from './applications/permission-index.application';
import { Permission } from 'entities/iam/permission.entity';
import { PermissionController } from './controllers/permission.controller';
import { CacheModule } from '../../infrastructure/cache/cache.module';
import { LogActivity } from 'entities/log-activity/log-activity.entity';
import { LogActivityService } from '../log-activity/services/log-activity.service';
import { LdapService } from '../auth/services/ldap.service';
import { AbilityModule } from '../../infrastructure/ability/ability.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([User, Role, Permission, LogActivity]),
        CacheModule,
        AbilityModule,
    ],
    controllers: [UserController, RoleController, PermissionController],
    providers: [
        LdapService,
        InertiaAdapter,
        UserCrudApplication,
        UserService,
        UserIndexApplication,
        RoleCrudApplication,
        RoleService,
        RoleIndexApplication,
        PermissionCrudApplication,
        PermissionService,
        PermissionIndexApplication,
        LogActivityService,
    ],
    exports: [UserCrudApplication],
})
export class IamModule {}
