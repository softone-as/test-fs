import { Controller, Get } from '@nestjs/common';
import { InertiaAdapter } from 'apps/backoffice/src/infrastructure/inertia/adapter/inertia.adapter';

@Controller('sample/form')
// @UseGuards(LoggedInGuard)
export class SampleController {
    constructor(private readonly inertiaAdapter: InertiaAdapter) {}

    @Get('basic')
    async formBasicPage(): Promise<void> {
        return this.inertiaAdapter.render({
            component: 'Sample/Form/FormBasic',
        });
    }

    @Get('step')
    async formStepPage(): Promise<void> {
        return this.inertiaAdapter.render({
            component: 'Sample/Form/FormStep',
        });
    }

    @Get('advanced')
    async formAdvancedPage(): Promise<void> {
        return this.inertiaAdapter.render({
            component: 'Sample/Form/FormAdvanced',
        });
    }
}
