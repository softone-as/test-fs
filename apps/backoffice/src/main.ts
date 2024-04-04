import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from './config';
import {
    initializeTransactionalContext,
    patchTypeORMRepositoryWithBaseRepository,
} from 'typeorm-transactional-cls-hooked';
import { Logger } from '@nestjs/common';
import { join } from 'path';
import inertia from 'inertia-node';
import { NestExpressApplication } from '@nestjs/platform-express';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { intertiaHtml } from './infrastructure/inertia/template/inertia.html';
import { ZodValidationPipe } from 'nestjs-zod';

const ASSET_VERSION = '1';

async function bootstrap(): Promise<void> {
    initializeTransactionalContext();
    patchTypeORMRepositoryWithBaseRepository();

    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        logger: ['error'],
    });

    const publicPath = join(__dirname, '..', 'public');
    app.useStaticAssets(publicPath);

    app.use(inertia(intertiaHtml, ASSET_VERSION));
    app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
    app.enableCors();
    app.useGlobalPipes(new ZodValidationPipe());

    const host = config.host;
    const port = config.port;

    await app.listen(port);
    Logger.log(`Application running ${host}:${port}`, 'NestApplication');
}
bootstrap();
