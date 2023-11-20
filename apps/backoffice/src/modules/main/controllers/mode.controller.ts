import { Controller, Get, Query, Res } from '@nestjs/common';
import { HealthCheckService, TypeOrmHealthIndicator, HealthCheck, MemoryHealthIndicator } from '@nestjs/terminus';
import { config } from 'apps/backoffice/src/config';
import { InertiaAdapter } from 'apps/backoffice/src/infrastructure/inertia/adapter/inertia.adapter';
import { IPauseMode } from 'interface-models/mode/pause-mode.interface';

@Controller('mode')
export class ModeController {
    constructor(private readonly inertiaAdapter: InertiaAdapter) { }

    @Get('/maintain')
    maintainMode() {
        return this.inertiaAdapter.render({
            component: 'MaintainMode',
        });
    }

    @Get('/pause')
    pauseMode(
        @Query('message') message: string,
        @Query('start_at') startAt: string,
        @Query('end_at') endAt: string,
    ) {
        return this.inertiaAdapter.render({
            component: 'PauseMode',
            props: {
                data: <IPauseMode>{
                    message,
                    startAt,
                    endAt,
                }
            }
        });
    }
}
