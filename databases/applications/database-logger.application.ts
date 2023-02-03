import { QueryRunner } from 'typeorm';
import * as Sentry from '@sentry/node';

export class DatabaseLoggerApplication {
    async logQuery(query: string, parameters: any[], queryRunner: QueryRunner) {
        const transaction = Sentry.startTransaction({
            name: 'query',
            op: 'transaction query',
        });

        Sentry.getCurrentHub().configureScope((scope) =>
            scope.setSpan(transaction),
        );

        // TODO: How to make operation after transaction start and
        // transaction finish IN THIS LINE for custom query calculation

        const span = transaction.startChild({
            op: 'sub query',
            data: queryRunner,
            description: query,
        });

        try {
            span.setStatus('OK');
        } catch (err) {
            span.setStatus(err);
            throw err;
        } finally {
            span.finish();
            transaction.finish();
        }
    }
}
