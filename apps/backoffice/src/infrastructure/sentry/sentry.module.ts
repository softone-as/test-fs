import { Module } from '@nestjs/common';
import * as Sentry from '@sentry/node';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { SentryService } from './sentry.service';
import { SentryInterceptor } from '../../common/interceptors/sentry.interceptor';
export const SENTRY_OPTIONS = 'SENTRY_OPTIONS';

@Module({
    providers: [SentryService],
})
export class SentryModule {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    static forRoot(options: Sentry.NodeOptions) {
        // initialization of Sentry, this is where Sentry will create a Hub
        Sentry.init(options);

        return {
            module: SentryModule,
            providers: [
                {
                    provide: SENTRY_OPTIONS,
                    useValue: options,
                },
                SentryService,
                {
                    provide: APP_INTERCEPTOR,
                    useClass: SentryInterceptor,
                },
            ],
            exports: [SentryService],
        };
    }
}
