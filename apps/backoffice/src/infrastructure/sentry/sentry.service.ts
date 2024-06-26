import { Request } from 'express';
import { Scope } from '@nestjs/common';
import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import * as Sentry from '@sentry/node';
import '@sentry/tracing';
import { Span, SpanContext } from '@sentry/types';
import { Utils } from '../../common/utils/util';

/**
 * Because we inject REQUEST we need to set the service as request scoped
 */
@Injectable({ scope: Scope.REQUEST })
export class SentryService {
    /**
     * Return the current span defined in the current Hub and Scope
     */
    get span(): Span | undefined {
        return Sentry.getCurrentHub().getScope().getSpan();
    }

    /**
     * When injecting the service it will create the main transaction
     *
     * @param request
     */
    constructor(@Inject(REQUEST) private request: Request) {
        const { method, headers, url } = this.request;

        let traceIdFromFe = '';

        if (headers['baggage']) {
            const baggageHeader = String(request.headers['baggage']);

            [traceIdFromFe] = Utils.splitBaggageHeader(baggageHeader);
        }

        // recreate transaction based from HTTP request
        const transaction = Sentry.startTransaction({
            name: method + ' ' + this.request.route?.path || url,
            op: 'transaction',
            status: 'ok',

            traceId: traceIdFromFe
                ? traceIdFromFe
                : Utils.generateRandomHexString(32),
        });

        // setup context of newly created transaction
        Sentry.getCurrentHub().configureScope((scope) => {
            scope.setSpan(transaction);

            // customize your context here
            scope.setContext('http', {
                method,
                url,
                headers,
            });
        });
    }

    /**
     * This will simply start a new child span in the current span
     *
     * @param spanContext
     */
    startChild(spanContext: SpanContext): Span | undefined {
        return this.span?.startChild(spanContext);
    }
}
