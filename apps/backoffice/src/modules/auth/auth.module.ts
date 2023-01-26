import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'entities/iam/user.entity';
import { InertiaAdapter } from '../../infrastructure/inertia/adapter/inertia.adapter';
import { AuthApplication } from './applications/auth.application';
import { AuthController } from './controllers/auth.controller';
import { AdminAuthService } from './services/auth-admin.service';
import { UserService } from '../iam/services/user.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { UserSerializer } from './serializers/user.serializer';
import { UserCrudApplication } from '../iam/applications/user-crud.application';
import { OneSignalPushNotificationService } from '../../infrastructure/notification/services/one-signal-push-notification.service';
import { EmailNotificationService } from '../../infrastructure/notification/services/email-notification.service';
import { ForgotPasswordController } from '../auth/controllers/auth-forgot-password.controller';
import { AuthForgotPasswordApplication } from './applications/auth-forgot-password.application';
import { OtpService } from './services/otp.service';
import { Otp } from 'entities/otp/otp.entity';
import { CacheModule } from '../../infrastructure/cache/cache.module';
import { Role } from 'entities/iam/role.entity';
import { RoleService } from '../iam/services/role.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([User, Role, Otp]),
        PassportModule.register({
            session: true,
            defaultStrategy: 'local',
        }),
        CacheModule,
    ],
    controllers: [AuthController, ForgotPasswordController],
    providers: [
        InertiaAdapter,
        AdminAuthService,
        UserService,
        RoleService,
        UserSerializer,
        AuthApplication,
        AuthForgotPasswordApplication,
        EmailNotificationService,
        OneSignalPushNotificationService,
        OtpService,
        LocalStrategy,
        UserCrudApplication,
    ],
    exports: [],
})
export class AdminAuthModule {}
