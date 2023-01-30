import {
    Controller,
    Get,
    Post,
    Query,
    Req,
    Res,
    UseGuards,
} from '@nestjs/common';
import { InertiaAdapter } from 'apps/backoffice/src/infrastructure/inertia/adapter/inertia.adapter';
import { Request, Response } from 'express';
import { AuthApplication } from '../applications/auth.application';
import { LocalGuard } from '../guards/local.guard';
import { LoggedInGuard } from '../guards/logged-in.guard';
import { LoggedOutGuard } from '../guards/logged-out.guard';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly inertiaAdapter: InertiaAdapter,
        private readonly authApplication: AuthApplication,
    ) {}

    @Get('login')
    @UseGuards(LoggedOutGuard)
    async loginPage(): Promise<void> {
        return this.inertiaAdapter.render({
            component: 'Login',
        });
    }

    @UseGuards(LocalGuard)
    @Post('login')
    async login(
        @Query('one_signal_player_id') playerId: string,
        @Req() req: Request,
    ): Promise<void> {
        const id = req.user['id'];
        await this.authApplication.loginAttempt(id, playerId);
        return this.inertiaAdapter.successResponse('/', 'Success Login');
    }

    @UseGuards(LoggedInGuard)
    @Get('logout')
    async logout(
        @Query('one_signal_player_id') playerId: string,
        @Res() res: Response,
    ): Promise<void> {
        await this.authApplication.logout(playerId);
        return res.redirect('/');
    }
}
