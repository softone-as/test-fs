import { LdapService } from './services/ldap.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'entities/iam/user.entity';
import { InertiaAdapter } from '../../infrastructure/inertia/adapter/inertia.adapter';
import { AuthApplication } from './applications/auth.application';
import { AuthController } from './controllers/auth.controller';
import { AdminAuthService } from './services/auth-admin.service';
import { UserService } from '../iam/repositories/user.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { UserSerializer } from './serializers/user.serializer';
import { UserCrudApplication } from '../iam/services/user-crud.application';
import { OneSignalPushNotificationService } from '../../infrastructure/notification/services/one-signal-push-notification.service';
import { EmailNotificationService } from '../../infrastructure/notification/services/email-notification.service';
import { ForgotPasswordController } from '../auth/controllers/auth-forgot-password.controller';
import { AuthForgotPasswordApplication } from './applications/auth-forgot-password.application';
import { OtpService } from './services/otp.service';
import { Otp } from 'entities/otp/otp.entity';
import { CacheModule } from '../../infrastructure/cache/cache.module';
import { Role } from 'entities/iam/role.entity';
import { RoleRepository } from '../iam/repositories/role.repository';
import { LogActivity } from 'entities/log-activity/log-activity.entity';
import { LogActivityService } from '../log-activity/services/log-activity.service';
import { Connection } from 'typeorm';
import { OidcStrategy, buildOpenIdClient } from './strategies/oidc.strategy';
import { RedisModule } from '../../infrastructure/redis';
import { FailSafeModule } from '../../infrastructure/fail-safe/fail-safe.module';
import { PaginateUtil } from '../../common/utils/paginate.util';

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
    ],
    controllers: [AuthController, ForgotPasswordController],
    providers: [
        PaginateUtil,
        InertiaAdapter,
        AdminAuthService,
        UserService,
        RoleRepository,
        UserSerializer,
        AuthApplication,
        AuthForgotPasswordApplication,
        EmailNotificationService,
        OneSignalPushNotificationService,
        OtpService,
        LocalStrategy,
        {
            provide: 'OidcStrategy',
            useFactory: async (connection: Connection) => {
                const userRepository = connection.getRepository(User);
                const roleRepository = connection.getRepository(Role);

                const client = await buildOpenIdClient();
                const strategy = new OidcStrategy(
                    roleRepository,
                    userRepository,
                    client,
                );
                return strategy;
            },
            inject: [Connection],
        },

        UserCrudApplication,
        LogActivityService,
        LdapService,
    ],
    exports: [],
})
export class AdminAuthModule {}
