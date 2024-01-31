import { Controller, Get } from '@nestjs/common';
import { InertiaAdapter } from 'apps/backoffice/src/infrastructure/inertia/adapter/inertia.adapter';

@Controller('sample')
export class SampleController {
    constructor(private readonly inertiaAdapter: InertiaAdapter) {}

    @Get('form/basic')
    async formBasicPage(): Promise<undefined> {
        return this.inertiaAdapter.render('Sample/Form/FormBasic', undefined);
    }

    @Get('form/step')
    async formStepPage(): Promise<undefined> {
        return this.inertiaAdapter.render('Sample/Form/FormStep', undefined);
    }

    @Get('form/advanced')
    async formAdvancedPage(): Promise<undefined> {
        return this.inertiaAdapter.render(
            'Sample/Form/FormAdvanced',
            undefined,
        );
    }

    @Get('detail/basic')
    async detailBasicPage(): Promise<undefined> {
        return this.inertiaAdapter.render(
            'Sample/Detail/DetailBasic',
            undefined,
        );
    }

    @Get('detail/advanced')
    async detailAdvancedPage(): Promise<undefined> {
        return this.inertiaAdapter.render(
            'Sample/Detail/DetailAdvanced',
            undefined,
        );
    }
}
