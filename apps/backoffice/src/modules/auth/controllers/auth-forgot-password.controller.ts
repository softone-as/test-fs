import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { InertiaAdapter } from 'apps/backoffice/src/infrastructure/inertia/adapter/inertia.adapter';
import { AuthForgotPasswordService } from '../services/auth-forgot-password.service';
import { UserConfirmForgotPasswordRequest } from '../requests/user-confirm-forgot-password.request';
import { AuthForgotPasswordRequest } from '../../../../@contracts/auth/auth-forgot-password.request';

@Controller('auth')
export class ForgotPasswordController {
    constructor(
        private readonly inertiaAdapter: InertiaAdapter,
        private readonly authForgotPasswordService: AuthForgotPasswordService,
    ) {}

    @Get('forgot-password')
    async forgotPasswordPage(): Promise<undefined> {
        return this.inertiaAdapter.render('ForgotPassword', undefined);
    }

    @Get('change-password')
    async changePasswordPage(): Promise<undefined> {
        return this.inertiaAdapter.render('ChangePassword', undefined);
    }

    @Post('forgot-password')
    async forgotPassword(
        @Body() req: AuthForgotPasswordRequest,
    ): Promise<void> {
        await this.authForgotPasswordService.forgotPassword(req);
        return this.inertiaAdapter.successResponse(
            '/auth/login',
            'Check your email',
        );
    }

    @Post('confirm-forgot-password')
    async confirmForgotPassword(
        @Query('email') email: string,
        @Query('otp_code') otpCode: string,
        @Body() req: UserConfirmForgotPasswordRequest,
    ): Promise<void> {
        await this.authForgotPasswordService.changePassword(
            email,
            otpCode,
            req,
        );
        return this.inertiaAdapter.successResponse(
            '/auth/login',
            'Success change password',
        );
    }
}
