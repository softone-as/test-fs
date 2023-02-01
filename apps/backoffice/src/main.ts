import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as Sentry from '@sentry/node';
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

const ASSET_VERSION = '1';

async function bootstrap() {
    // Sentry
    Sentry.init({
        dsn: config.sentry.dsn,
        attachStacktrace: true,
        debug: config.nodeEnv === 'local',
        environment: config.nodeEnv,
        tracesSampleRate: 1.0,
    });

    initializeTransactionalContext();
    patchTypeORMRepositoryWithBaseRepository();

    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    const publicPath = join(__dirname, '..', 'public');
    app.useStaticAssets(publicPath);

    const html = (pageString, view) => {
        const { viewData } = view;
        return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
      
        <meta http-equiv='cache-control' content='no-cache'>
        <meta http-equiv='expires' content='0'>
        <meta http-equiv='pragma' content='no-cache'>

        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />

        <meta name="description" content="${viewData.description}">
        <title>${viewData.title}</title>

        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <link rel="stylesheet" href="/css/site.css" />
        <script defer type="module" src="/js/bundle.js"></script>

      </head>

      <body>
        <div id="app" data-page='${pageString}'></div>
      </body>
    </html>
    `;
    };

    app.use(inertia(html, ASSET_VERSION));

    app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

    app.enableCors();
    const port: string = config.port;
    await app.listen(port);
    Logger.log(`Application running on port ${port}`, 'NestApplication');
}
bootstrap();
