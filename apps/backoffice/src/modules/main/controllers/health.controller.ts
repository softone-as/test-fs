import { Controller, Get } from '@nestjs/common';
import {
    HealthCheckService,
    TypeOrmHealthIndicator,
    HealthCheck,
    HealthCheckResult,
    HealthIndicatorResult,
} from '@nestjs/terminus';
import { config } from 'apps/backoffice/src/config';

@Controller('health')
export class HealthController {
    constructor(
        private health: HealthCheckService,
        private db: TypeOrmHealthIndicator,
    ) {}

    @Get()
    @HealthCheck()
    check(): Promise<HealthCheckResult> {
        return this.health.check([
            (): Promise<HealthIndicatorResult> =>
                this.db.pingCheck(config.database.database),
        ]);
    }
}
