import { Module } from '@nestjs/common';
import { InertiaAdapter } from '../../infrastructure/inertia/adapter/inertia.adapter';
import { DashbordController } from './controllers/dashboard.controller';
import { MainController } from './controllers/main.controller';
import { SampleController } from './controllers/sample.controller';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './controllers/health.controller';
import { ModeController } from './controllers/mode.controller';
import { CircuitBreakerController } from './controllers/circuit-braeker.controller';
import { TerminusLogger } from '../../infrastructure/loggers/terminus.logger';

@Module({
    imports: [
        TerminusModule.forRoot({
            logger: TerminusLogger,
            errorLogStyle: 'pretty',
        }),
    ],
    controllers: [
        DashbordController,
        CircuitBreakerController,
        ModeController,
        MainController,
        SampleController,
        HealthController,
    ],
    providers: [InertiaAdapter],
})
export class MainModule {}
