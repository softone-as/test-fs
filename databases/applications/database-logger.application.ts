import { SentryService } from 'apps/backoffice/src/infrastructure/sentry/sentry.service';
import { QueryRunner } from 'typeorm';

export class DatabaseLoggerApplication {
    constructor(private readonly sentryService: SentryService) {}

    async logQuery(query: string, parameters: any[], queryRunner: QueryRunner) {
        const result = this.sentryService.startChild({
            op: 'query',
            data: queryRunner,
            description: query,
        });

        console.log(result);
    }
}
