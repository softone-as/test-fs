import { Controller, Get, UseGuards } from '@nestjs/common';
import { InertiaAdapter } from 'apps/backoffice/src/infrastructure/inertia/adapter/inertia.adapter';
import { LoggedInGuard } from '../../auth/guards/logged-in.guard';

@Controller('dashboard')
@UseGuards(LoggedInGuard)
export class DashbordController {
    constructor(private readonly inertiaAdapter: InertiaAdapter) {}

    @Get('page')
    async indexPage(): Promise<void> {
        return this.inertiaAdapter.render({ component: 'Dashboard' });
    }
}
