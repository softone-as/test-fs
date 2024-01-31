import { Span } from '@sentry/tracing';
import { SentryQueryService } from 'apps/backoffice/src/infrastructure/sentry/sentry-query.service';
import { Logger as TypeormLogger } from 'typeorm';

export class DatabaseLogger implements TypeormLogger {
    constructor(
        private sentryQueryService: SentryQueryService,
        private span: Span,
    ) {}

    logQuery(query: string): void {
        const transaction = this.sentryQueryService.startTransaction();
        if (!transaction) return;
        const span = this.sentryQueryService.startSpan(transaction, query);
        if (!span) return;

        this.span = span;
    }

    logQuerySlow(): void {
        this.sentryQueryService.finishSpan(this.span);
    }

    logQueryError(error: string | Error, query: string): void {
        const transaction = this.sentryQueryService.startTransaction();
        if (!transaction) return;
        const span = this.sentryQueryService.startSpan(
            transaction,
            'Error' + error + query,
        );
        if (!span) return;

        this.span = span;
    }

    logSchemaBuild(): void {
        // Method not implemented.
    }
    logMigration(): void {
        // Method not implemented.
    }
    log(): void {
        // Method not implemented.
    }
}
