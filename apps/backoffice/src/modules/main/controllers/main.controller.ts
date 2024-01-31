import { Controller, Get } from '@nestjs/common';
import { InertiaAdapter } from 'apps/backoffice/src/infrastructure/inertia/adapter/inertia.adapter';

@Controller()
export class MainController {
    constructor(private readonly inertiaAdapter: InertiaAdapter) {}

    @Get()
    async indexPage(): Promise<void> {
        return this.inertiaAdapter.successResponse('/', 'Wellcome');
    }

    @Get('server-error')
    async serverErrorPage(): Promise<undefined> {
        return this.inertiaAdapter.render('ServerError', undefined);
    }

    @Get('forbidden-error')
    async forbiddenErrorPage(): Promise<undefined> {
        return this.inertiaAdapter.render('ForbiddenError', undefined);
    }

    @Get('not-found-error')
    async notFoundErrorPage(): Promise<undefined> {
        return this.inertiaAdapter.render('NotFoundError', undefined);
    }
}
