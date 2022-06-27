import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { EmailNotificationService } from 'apps/backoffice/src/infrastructure/notification/services/email-notification.service';
import { OneSignalPushNotificationService } from '../../../infrastructure/notification/services/one-signal-push-notification.service';
import { AdminAuthService } from '../services/auth-admin.service';
import { Request } from 'express';

@Injectable()
export class AuthApplication {
    constructor(
        @Inject(REQUEST) private readonly request: Request,
        private readonly adminAuthService: AdminAuthService,
        private readonly oneSignalPushNotificationService: OneSignalPushNotificationService,
        private readonly emailNotificationService: EmailNotificationService,
    ) {}

    async addOneSignalPlayerIdById(
        id: number,
        playerId: string,
    ): Promise<void> {
        await this.adminAuthService.addOneSignalPlayerIdById(id, playerId);
        await this.oneSignalPushNotificationService.setStatus(playerId, true);
        this.request.session['playerId'] = playerId || null;
    }

    async sendNotifEmailLoginAttempt(): Promise<void> {
        const email = this.request.user['email'];
        this.emailNotificationService.sendEmail(
            'Login Attempt',
            {},
            'login-attempt',
            email,
        );
    }

    async loginAttempt(id: number, playerId: string): Promise<void> {
        const isUUID =
            /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
                playerId,
            );
        if (isUUID) {
            await this.addOneSignalPlayerIdById(id, playerId);
        }

        await this.sendNotifEmailLoginAttempt();
    }

    async logout(playerId: string): Promise<void> {
        const id = this.request.user['id'];
        this.request.session['playerId'] = null;
        await this.adminAuthService.removeOneSignalPlayerIdById(id, playerId);
        await this.oneSignalPushNotificationService.setStatus(playerId, false);
        this.request.logOut((done) => {
            console.log(done);
        });
    }
}
