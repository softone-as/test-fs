import { Controller, Get, Query, Res } from '@nestjs/common';
import { HealthCheckService, TypeOrmHealthIndicator, HealthCheck, MemoryHealthIndicator } from '@nestjs/terminus';
import { config } from 'apps/backoffice/src/config';
import { InertiaAdapter } from 'apps/backoffice/src/infrastructure/inertia/adapter/inertia.adapter';
import { IPauseMode } from 'interface-models/mode/pause-mode.interface';

@Controller('circuit-breaker')
export class CircuitBreakerController {
    constructor(private readonly inertiaAdapter: InertiaAdapter) { }

    @Get('/feature-close')
    featureClose() {
        return this.inertiaAdapter.render({
            component: 'FeatureClose',
        });
    }
}
