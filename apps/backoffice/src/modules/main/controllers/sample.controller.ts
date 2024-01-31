import { Controller, Get } from '@nestjs/common';
import { InertiaAdapter } from 'apps/backoffice/src/infrastructure/inertia/adapter/inertia.adapter';

@Controller('sample')
export class SampleController {
    constructor(private readonly inertiaAdapter: InertiaAdapter) {}

    @Get('form/basic')
    async formBasicPage(): Promise<Record<string, any>> {
        return this.inertiaAdapter.render('Sample/Form/FormBasic');
    }

    @Get('form/step')
    async formStepPage(): Promise<Record<string, any>> {
        return this.inertiaAdapter.render('Sample/Form/FormStep');
    }

    @Get('form/advanced')
    async formAdvancedPage(): Promise<Record<string, any>> {
        return this.inertiaAdapter.render('Sample/Form/FormAdvanced');
    }

    @Get('detail/basic')
    async detailBasicPage(): Promise<Record<string, any>> {
        return this.inertiaAdapter.render('Sample/Detail/DetailBasic');
    }

    @Get('detail/advanced')
    async detailAdvancedPage(): Promise<Record<string, any>> {
        return this.inertiaAdapter.render('Sample/Detail/DetailAdvanced');
    }
}
