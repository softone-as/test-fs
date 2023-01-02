import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as Sentry from '@sentry/node';
import { config } from './config';
import {
    initializeTransactionalContext,
    patchTypeORMRepositoryWithBaseRepository,
} from 'typeorm-transactional-cls-hooked';
import { Logger } from '@nestjs/common';
import { HttpService } from 'nestjs-http-promise';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as callbackAPI from 'amqplib/callback_api';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';

async function bootstrap() {
    // Sentry
    Sentry.init({
        dsn: config.sentry.dsn,
        attachStacktrace: true,
        debug: config.nodeEnv !== 'local',
        environment: config.nodeEnv,
    });

    initializeTransactionalContext();
    patchTypeORMRepositoryWithBaseRepository();

    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.useGlobalInterceptors(new LoggingInterceptor(new HttpService()));

    const publicPath = join(__dirname, '..', 'public');
    app.useStaticAssets(publicPath);
    app.setGlobalPrefix('/api/v1');

    callbackAPI.connect(
        config.amqp.url,
        (err: Error, conn: callbackAPI.Connection) => {
            if (err != null) {
                console.error(err);
                process.exit(1);
            }

            config.amqp.conn = conn;
        },
    );

    app.enableCors();
    const port: string = config.port;
    await app.listen(port);

    Logger.log(`Application running on port ${port}`, 'NestApplication');
}

bootstrap();
