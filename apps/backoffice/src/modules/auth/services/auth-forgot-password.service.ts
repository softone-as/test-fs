import { Injectable } from '@nestjs/common';
import { EmailNotificationService } from '../../../infrastructure/notification/services/email-notification.service';
import { AdminAuthService } from './auth-admin.service';
import { OtpService } from './otp.service';
import { EntityNotFoundError } from 'typeorm';
import BadRequestAndRedirectException from '../../../infrastructure/error/bad-request-and-redirect.exception';
import { config } from '../../../config';
import { AuthConfirmForgotPasswordRequest } from '../requests/auth-confirm-forgot-password.request';
import { AuthForgotPasswordRequest } from '../requests/auth-forgot-password.request';

@Injectable()
export class AuthForgotPasswordService {
    constructor(
        private readonly emailNotificationService: EmailNotificationService,
        private readonly authService: AdminAuthService,
        private readonly otpService: OtpService,
    ) {}

    async forgotPassword(data: AuthForgotPasswordRequest): Promise<void> {
        const user = await this.authService.findByEmail(data.email);
        const generateCode = await this.otpService.createNewCodeByIdentifier(
            data.email,
        );

        const linkChangePassword =
            config.host +
            '/auth/change-password?email=' +
            user.email +
            '&otp_code=' +
            generateCode;
        const content = {
            linkChangePassword,
        };

        this.emailNotificationService.sendEmail(
            'Confirmation Forgot Password',
            content,
            'forgot-password-confirmation',
            data.email,
        );
    }

    async changePassword(
        email: string,
        otpCode: string,
        data: AuthConfirmForgotPasswordRequest,
    ): Promise<void> {
        try {
            const otp = await this.otpService.findByIdentifierAndCode(
                email,
                otpCode,
            );

            await this.otpService.updateValidOTP(otp.id);
            await this.authService.updatePasswordByEmail(email, data.password);
        } catch (e) {
            if (e instanceof EntityNotFoundError) {
                throw new BadRequestAndRedirectException(
                    '/auth/change-password',
                    'The link is expired',
                );
            }

            throw e;
        }
    }
}
