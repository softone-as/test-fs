import { Span, Transaction } from '@sentry/tracing';
import * as Sentry from '@sentry/node';

export type SentryQueryResponse = {
    transaction: Transaction;
    span: Span;
};

export class SentryQueryService {
    startTransaction(name: string, query?: string): SentryQueryResponse {
        const transaction = Sentry.startTransaction({
            op: 'Query ' + name,
            name: 'Query ' + name,
        });

        Sentry.getCurrentHub().configureScope((scope) =>
            scope.setSpan(transaction as any),
        );

        const span = transaction.startChild({
            op: 'query',
            description: query,
        });

        return {
            transaction: transaction as unknown as Transaction,
            span: span as unknown as Span,
        };
    }

    finishTransaction(sentryQuery: SentryQueryResponse) {
        try {
            sentryQuery.span.setStatus('ok');
        } catch (err) {
            sentryQuery.span.setStatus(err);
            throw err;
        } finally {
            sentryQuery.span.finish();
            sentryQuery.transaction.finish();
            console.log(sentryQuery.transaction);
        }
    }
}
