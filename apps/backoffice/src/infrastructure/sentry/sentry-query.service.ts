import { Span, Transaction } from '@sentry/tracing';
import * as Sentry from '@sentry/node';
import { Request } from 'express';

export class SentryQueryService {
    startTransaction(req?: Request): Transaction {
        const transaction = Sentry.getCurrentHub().getScope().getTransaction();

        if (transaction) return transaction as unknown as Transaction;

        return Sentry.startTransaction({
            op: 'Query ' + req.url,
            name: 'Query',
            status: 'ok',
        }) as unknown as Transaction;
    }

    startSpan(transaction: Transaction, query: string): Span {
        return transaction.startChild({
            op: 'query',
            description: query,
        });
    }

    finishSpan(span: Span) {
        try {
            span.setStatus('ok');
        } catch (err) {
            span.setStatus(err);
            throw err;
        } finally {
            span.finish();
        }
    }

    finishTransaction(transaction: Transaction) {
        try {
            transaction.finish();
        } catch (err) {
            transaction.setStatus(err);
            throw err;
        }
    }
}
