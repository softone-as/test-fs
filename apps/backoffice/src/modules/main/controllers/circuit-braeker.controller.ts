import { Controller, Get } from '@nestjs/common';
import { InertiaAdapter } from 'apps/backoffice/src/infrastructure/inertia/adapter/inertia.adapter';

@Controller('circuit-breaker')
export class CircuitBreakerController {
    constructor(private readonly inertiaAdapter: InertiaAdapter) {}

    @Get('/feature-close')
    featureClose(): Record<string, any> {
        return this.inertiaAdapter.render('FeatureClose');
    }
}
