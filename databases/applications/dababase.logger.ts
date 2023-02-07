import { Span, Transaction } from '@sentry/tracing';
import { SentryQueryService } from 'apps/backoffice/src/infrastructure/sentry/sentry-query.service';

export class DatabaseLogger {
    constructor(
        private sentryQueryService: SentryQueryService,
        private transaction: Transaction,
        private span: Span,
    ) {}

    logQuery(query: string): any {
        const sentry = this.sentryQueryService.startTransaction(
            query.slice(0, 30),
            query,
        );

        this.transaction = sentry.transaction;
        this.span = sentry.span;
    }

    logQuerySlow(time: number): any {
        this.transaction.description = 'Time execute: ' + time;
        this.sentryQueryService.finishTransaction({
            transaction: this.transaction,
            span: this.span,
        });
    }
}
