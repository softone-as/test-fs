import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'entities/iam/user.entity';
import { InertiaAdapter } from '../../infrastructure/inertia/adapter/inertia.adapter';
import { UserCrudApplication } from './services/user-crud.application';
import { UserIndexApplication } from './services/user-index.application';
import { UserController } from './controllers/user.controller';
import { UserService } from './repositories/user.service';
import { RoleCrudApplication } from './services/role-crud.application';
import { RoleIndexApplication } from './services/role-index.application';
import { RoleController } from './controllers/role.controller';
import { RoleService } from './repositories/role.service';
import { Role } from 'entities/iam/role.entity';
import { PermissionCrudService } from './services/permission-crud.service';
import { PermissionRepository } from './repositories/permission.repository';
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
        PermissionCrudService,
        PermissionRepository,
        LogActivityService,
    ],
    exports: [UserCrudApplication],
})
export class IamModule {}
