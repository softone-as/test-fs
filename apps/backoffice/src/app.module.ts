import {
    HttpException,
    Inject,
    MiddlewareConsumer,
    Module,
    NestModule,
} from '@nestjs/common';
import { InertiaSharePropsMiddleware } from './infrastructure/inertia/middlewares/inertia-share-props.middleware';
import { APP_FILTER, APP_PIPE, APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RavenInterceptor, RavenModule } from 'nest-raven';
import {
    HttpExceptionFilter,
    EntityNotFoundExceptionFilter,
} from './common/filters/http-exeception.filter';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { ValidationPipe } from './common/pipes/validation.pipe';
import { connectionOption } from './infrastructure/databases';
import { ScheduleModule } from '@nestjs/schedule';
import { IamModule } from './modules/iam/iam.module';
import { ConfigModule } from './modules/config/config.module';
import { MainModule } from './modules/main/main.module';
import { AdminAuthModule } from './modules/auth/auth.module';
import RedisStore from 'connect-redis';
import session from 'express-session';
import { REDIS, RedisModule } from '../src/infrastructure/redis';
import { RedisClient } from 'redis';
import passport from 'passport';
import { QueryExceptionFilter } from './common/filters/query-error-exception.filter';
import { CommonModule } from './modules/common/common.module';
import { NotificationModule } from './infrastructure/notification/notification.module';
import { InertiaModule } from './infrastructure/inertia/inertia.module';
import { UserDetailMiddleware } from './modules/iam/middlewares/user-detail.middleware';
import { config } from './config';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { QueryFailedError } from 'typeorm';
import { CacheModule as CacheModuleManager } from '@nestjs/common';
import { CacheModule } from './infrastructure/cache/cache.module';
import { NotificationModule as InAppNotificationModule } from './modules/notification/notification.module';
import { CacheCleanMiddleware } from './infrastructure/cache/middlewares/cache-clean.middleware';
import { LogActivityModule } from './modules/log-activity/log-activity.module';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { GlobalServiceModule } from './modules/glob/global-service.module';

@Module({
    imports: [
        CacheModuleManager.register({
            isGlobal: true,
        }),

        TypeOrmModule.forRoot(connectionOption),
        RavenModule,
        RedisModule,
        ConfigModule,
        InAppNotificationModule,

        MailerModule.forRoot({
            transport: {
                host: config.mail.smtp.host,
                port: config.mail.smtp.port,
                secure: false,
                auth: {
                    user: config.mail.smtp.user,
                    pass: config.mail.smtp.password,
                },
            },
            defaults: {
                from: `"No Reply" <${config.mail.smtp.emailSender}>`,
            },
            template: {
                dir: join(__dirname, 'infrastructure/mail/templates'),
                adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
                options: {
                    strict: true,
                },
            },
        }),

        // write your module here
        CacheModule,
        AdminAuthModule,
        MainModule,
        CommonModule,
        IamModule,
        NotificationModule,

        ScheduleModule.forRoot(),

        InertiaModule,
        LogActivityModule,
        WinstonModule.forRoot({
            transports: [
                new winston.transports.File({
                    filename: 'info.log',
                    format: winston.format.combine(
                        winston.format.timestamp(),
                        winston.format.json(),
                    ),
                }),
            ],
        }),
        GlobalServiceModule,
    ],
    providers: [
        {
            // Global Error Handler
            provide: APP_FILTER,
            useClass: HttpExceptionFilter,
        },
        {
            // Global Error Handler
            provide: APP_FILTER,
            useClass: EntityNotFoundExceptionFilter,
        },
        {
            // Global Error Handler
            provide: APP_FILTER,
            useClass: QueryExceptionFilter,
        },
        {
            // Validation formatting response
            provide: APP_PIPE,
            useClass: ValidationPipe,
        },
        {
            // Output response using snakecase
            provide: APP_INTERCEPTOR,
            useClass: ResponseInterceptor,
        },
        {
            // Sentry configuration
            provide: APP_INTERCEPTOR,
            useValue: new RavenInterceptor({
                filters: [
                    {
                        type: HttpException,
                        filter: (exception: HttpException) =>
                            500 > exception.getStatus(),
                    },
                    {
                        type: QueryFailedError,
                        filter: () => false,
                    },
                ],
            }),
        },
    ],
})
export class AppModule implements NestModule {
    constructor(@Inject(REDIS) private readonly redis: RedisClient) {}

    configure(consumer: MiddlewareConsumer): void {
        consumer
            .apply(
                session({
                    store: new (RedisStore(session))({ client: this.redis }),
                    saveUninitialized: false,
                    secret: 'sup3rs3cr3t',
                    resave: false,
                    cookie: {
                        sameSite: true,
                        httpOnly: false,
                    },
                }),
                passport.initialize(),
                passport.session(),
                CacheCleanMiddleware,
                InertiaSharePropsMiddleware,
                UserDetailMiddleware,
            )
            .forRoutes('*');
    }
}
