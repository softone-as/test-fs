import { Span, Transaction } from '@sentry/tracing';
import {
    EntitySubscriberInterface,
    EventSubscriber,
    InsertEvent,
    RemoveEvent,
    TransactionCommitEvent,
    TransactionRollbackEvent,
    TransactionStartEvent,
    UpdateEvent,
} from 'typeorm';
import { RecoverEvent } from 'typeorm/subscriber/event/RecoverEvent';
import { SoftRemoveEvent } from 'typeorm/subscriber/event/SoftRemoveEvent';
import * as Sentry from '@sentry/node';

@EventSubscriber()
export class DatabaseSubscriber implements EntitySubscriberInterface {
    constructor(private transaction: Transaction, private span: Span) {}

    startTransaction(event: any, methodName: string) {
        const name = 'query transaction ' + event.metadata.name;

        const transaction = Sentry.startTransaction({
            op: 'query transaction ' + methodName,
            name: name,
        });

        Sentry.getCurrentHub().configureScope((scope) =>
            scope.setSpan(transaction as any),
        );

        const span = transaction.startChild({
            op: 'query',
            data: event.queryRunner,
        });

        this.span = span as unknown as Span;
        this.transaction = transaction as unknown as Transaction;
    }

    finishTransaction() {
        try {
            this.span.setStatus('ok');
        } catch (err) {
            this.span.setStatus(err);
            throw err;
        } finally {
            this.span.finish();
            this.transaction.finish();
        }
    }

    // <--- Method Event Subscribers --->

    afterLoad?() {
        // TODO: Create transaction beforeLoad, but beforeLoad() is not exist
    }

    // Insert

    beforeInsert(event: InsertEvent<any>) {
        this.startTransaction(event, this.afterInsert.name);
    }

    afterInsert() {
        this.finishTransaction();
    }

    // Update

    beforeUpdate(event: UpdateEvent<any>) {
        this.startTransaction(event, this.afterUpdate.name);
    }

    afterUpdate() {
        this.finishTransaction();
    }

    // Remove

    beforeRemove(event: RemoveEvent<any>) {
        this.startTransaction(event, this.afterRemove.name);
    }

    afterRemove() {
        this.finishTransaction();
    }

    // Softremove

    beforeSoftRemove(event: SoftRemoveEvent<any>) {
        this.startTransaction(event, this.afterSoftRemove.name);
    }

    afterSoftRemove() {
        this.finishTransaction();
    }

    // Recover

    beforeRecover(event: RecoverEvent<any>) {
        this.startTransaction(event, this.afterRecover.name);
    }

    afterRecover() {
        this.finishTransaction();
    }

    // TransactionStart

    beforeTransactionStart(event: TransactionStartEvent) {
        this.startTransaction(event, this.afterTransactionStart.name);
    }

    afterTransactionStart() {
        this.finishTransaction();
    }

    // TransactionCommit

    beforeTransactionCommit(event: TransactionCommitEvent) {
        this.startTransaction(event, this.afterTransactionCommit.name);
    }

    afterTransactionCommit() {
        this.finishTransaction();
    }

    // TransactionRollback

    beforeTransactionRollback(event: TransactionRollbackEvent) {
        this.startTransaction(event, this.beforeTransactionRollback.name);
    }

    afterTransactionRollback() {
        this.finishTransaction();
    }
}
