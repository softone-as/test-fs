import { LdapService } from './services/ldap.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../../../../entities/iam/user.entity';
import { InertiaAdapter } from '../../infrastructure/inertia/adapter/inertia.adapter';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { AdminAuthService } from './services/auth-admin.service';
import { UserRepository } from '../iam/repositories/user.repository';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { UserSerializer } from './serializers/user.serializer';
import { UserCrudService } from '../iam/services/user-crud.service';
import { OneSignalPushNotificationService } from '../../infrastructure/notification/services/one-signal-push-notification.service';
import { EmailNotificationService } from '../../infrastructure/notification/services/email-notification.service';
import { ForgotPasswordController } from '../auth/controllers/auth-forgot-password.controller';
import { AuthForgotPasswordService } from './services/auth-forgot-password.service';
import { OtpService } from './services/otp.service';
import { Otp } from '../../../../../entities/otp/otp.entity';
import { CacheModule } from '../../infrastructure/cache/cache.module';
import { Role } from '../../../../../entities/iam/role.entity';
import { RoleRepository } from '../iam/repositories/role.repository';
import { LogActivity } from '../../../../../entities/log-activity/log-activity.entity';
import { DataSource } from 'typeorm';
import { OidcStrategy, buildOpenIdClient } from './strategies/oidc.strategy';
import { RedisModule } from '../../infrastructure/redis';
import { FailSafeModule } from '../../infrastructure/fail-safe/fail-safe.module';
import { PaginateUtil } from '../../common/utils/paginate.util';
import { LogActivityModule } from '../log-activity/log-activity.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([User, Role, Otp, LogActivity]),
        PassportModule.register({
            session: true,
            defaultStrategy: 'local',
        }),
        CacheModule,
        RedisModule,
        FailSafeModule,
        LogActivityModule,
    ],
    controllers: [AuthController, ForgotPasswordController],
    providers: [
        PaginateUtil,
        InertiaAdapter,
        AdminAuthService,
        UserRepository,
        RoleRepository,
        UserSerializer,
        AuthService,
        AuthForgotPasswordService,
        EmailNotificationService,
        OneSignalPushNotificationService,
        OtpService,
        LocalStrategy,
        {
            provide: 'OidcStrategy',
            useFactory: async (
                dataSource: DataSource,
            ): Promise<OidcStrategy> => {
                const userRepository = dataSource.getRepository(User);
                const roleRepository = dataSource.getRepository(Role);

                const client = await buildOpenIdClient();
                const strategy = new OidcStrategy(
                    roleRepository,
                    userRepository,
                    client,
                );
                return strategy;
            },
            inject: [DataSource],
        },

        UserCrudService,
        LdapService,
    ],
    exports: [],
})
export class AdminAuthModule {}
