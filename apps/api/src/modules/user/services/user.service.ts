import {
    BadRequestException,
    Inject,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { IUser } from 'interface-models/iam/user.interface';
import { QueryFailedError, UpdateResult } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CacheClear } from 'apps/api/src/infrastructure/cache/decorators/cache-clear.decorator';
import { config } from 'apps/api/src/config';
import { UserRepository } from '../repositories/user.repository';
import { UserUpdateProfileRequest } from '../request/user-update-profile.request';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { UserUpdatePasswordRequest } from '../request/user-update-password.request';
import { Utils } from 'apps/api/src/common/utils/util';
import { OtpService } from '../../auth/services/otp.service';
import { GoSmsApiNotificationService } from 'apps/api/src/infrastructure/notification/services/gosmsapi-notification.service';
import { UserUpdateEmailRequest } from '../request/user-update-email.request';
import { OTP_UPDATE_EMAIL } from 'apps/api/src/common/constants/otp.constant';
import { EmailNotificationService } from 'apps/api/src/infrastructure/notification/services/email-notification.service';
import { UserUpdatePhoneNumberRequest } from '../request/user-update-phone.reques';

@Injectable()
export class UserService {
    constructor(
        @Inject(REQUEST) private readonly request: Request,
        private readonly userRepository: UserRepository,
        private readonly otpService: OtpService,
        private readonly smsNotificationService: GoSmsApiNotificationService,
        private readonly emailNotificationService: EmailNotificationService,
    ) {}

    async editUser(dataUpdate: UserUpdateProfileRequest): Promise<IUser> {
        const userId = this.request.user['id'] || null;
        const newUser = <IUser>{};
        const user = await this.findOneById(userId);

        if (dataUpdate.gender && user.gender) {
            throw new BadRequestException("Sorry, Gender Can't be Update");
        }
        if (dataUpdate.birthDate && user.birthDate) {
            throw new BadRequestException("Sorry, Birthdate Can't be Update");
        }

        newUser.fullname = dataUpdate.fullname;
        if (dataUpdate.birthDate) {
            newUser.birthDate = dataUpdate.birthDate;
        }
        if (dataUpdate.gender) {
            newUser.gender = dataUpdate.gender;
        }

        await this.update(userId, newUser);

        return await this.findOneById(userId);
    }

    async changePassword(
        userPasswordUpdate: UserUpdatePasswordRequest,
    ): Promise<void> {
        const userId = this.request.user['id'] || null;

        const user = await this.findOneById(userId);
        const isPasswordSame = await bcrypt.compare(
            userPasswordUpdate.oldPassword,
            user.password,
        );
        if (!isPasswordSame) {
            throw new BadRequestException('Password lama tidak sesuai');
        }

        const newPassword = await Utils.bcryptHash(
            userPasswordUpdate.newPassword,
        );

        await this.updatePassword(userId, newPassword);
    }

    async resendOtpUpdatePhone(newPhoneNumber: string): Promise<void> {
        const userId = this.request.user['id'] || null;
        const currentOtp = await this.otpService.findByIdentifier(
            newPhoneNumber,
        );

        const oneMinutesToResend = config.otp.cooldownResend.minutes;
        const fiveMinutesToResend = config.otp.allowRetryAfterMaxRetry.minutes;

        const isInitiateTrial = currentOtp.trial == 1;
        const isSecondTrial = currentOtp.trial == 2;
        const isThirdTrial = currentOtp.trial == 3;
        const isFourthTrial = currentOtp.trial == 4;
        const isFinalTrial = currentOtp.trial == 5;

        const nowTime = new Date();
        const oneMinuteWaiting = new Date(
            currentOtp.updatedAt.setMinutes(
                new Date(currentOtp.updatedAt).getMinutes() +
                    Number(oneMinutesToResend),
            ),
        );
        const halfMinuteWaiting = new Date(
            currentOtp.updatedAt.setSeconds(
                new Date(currentOtp.updatedAt).getSeconds() + 30,
            ),
        );

        const fiveMinuteWaiting = new Date(
            currentOtp.updatedAt.setMinutes(
                new Date(currentOtp.updatedAt).getMinutes() +
                    Number(fiveMinutesToResend),
            ),
        );

        if (isInitiateTrial && nowTime < oneMinuteWaiting) {
            throw new BadRequestException('Cannot resend OTP, wait 1 minutes');
        } else if (
            (isSecondTrial || isThirdTrial || isFourthTrial) &&
            nowTime < halfMinuteWaiting
        ) {
            throw new BadRequestException('Cannot resend OTP, wait 30 seconds');
        } else if (isFinalTrial && nowTime < fiveMinuteWaiting) {
            throw new BadRequestException('Cannot resend OTP, wait 5 minutes');
        }

        const otpCode = await this.otpService.createNewCodeByIdentifier(
            newPhoneNumber,
            isFinalTrial,
        );

        this.smsNotificationService.sendSMS(
            userId,
            'SMS OTP Perubahan Nomor Telepon kamu adalah : ' + otpCode,
            newPhoneNumber,
        );
    }

    async updateEmailByIdentifierAndOtp(
        identifier: string,
        otpCode: string,
        newEmail: string,
    ): Promise<void> {
        const otp = await this.otpService.findByIdentifierAndCode(
            identifier,
            otpCode,
        );
        if (!otp) {
            throw new BadRequestException('Otp tidak ditemukan');
        } else if (otp.isValid || otp.expiredAt < new Date()) {
            throw new BadRequestException('Otp tidak berlaku');
        }

        await this.updateEmailByOldEmail(identifier, newEmail);
        await this.otpService.updateValidOTP(otp.id);
    }

    async updatePhoneByOtp(
        otpCode: string,
        newPhoneNumber: string,
    ): Promise<void> {
        const phoneNumber = this.request.user['phoneNumber'] || null;
        if (!phoneNumber) {
            throw new UnauthorizedException();
        }

        // Cek OTP & New Phone Number
        const otp = await this.otpService.findOneByIdentifierAndCode(
            newPhoneNumber,
            otpCode,
        );

        if (otp == undefined) {
            throw new BadRequestException('OTP number is not match');
        }

        if (otp.isValid || otp.expiredAt < new Date()) {
            throw new BadRequestException('Otp sudah kadaluarsa');
        }

        await this.updatePhoneNumberByPhoneNumber(phoneNumber, newPhoneNumber);
        await this.otpService.updateValidOTP(otp.id);
    }

    async sendEmailUpdateConfirmation(
        userEmailUpdate: UserUpdateEmailRequest,
    ): Promise<void> {
        const userId = this.request.user['id'] || null;
        const email = this.request.user['email'] || null;
        const isRegistered = await this.isEmailExists(
            userEmailUpdate.newEmail,
            +userId,
        );

        if (isRegistered) {
            throw new BadRequestException('Email sudah terdaftar');
        }

        const otpCode = await this.otpService.createNewCodeByIdentifier(
            email,
            true,
        );

        const confirmationLink = `${config.host}/users/confirm-otp/${OTP_UPDATE_EMAIL}/${otpCode}?identifier=${email}&new_identity=${userEmailUpdate.newEmail}`;
        await this.emailNotificationService.sendEmail(
            'Notifikasi perubahan email',
            { email: userEmailUpdate.newEmail, confirmationLink },
            'change-email',
            userEmailUpdate.newEmail,
        );
    }

    async resendOtpUpdateEmail(newEmail: string): Promise<void> {
        const userId = this.request.user['id'] || null;
        const email = this.request.user['email'] || null;
        const isRegistered = await this.isEmailExists(newEmail, +userId);

        if (isRegistered) {
            throw new BadRequestException('Email sudah terdaftar');
        }

        const otpCode = await this.otpService.createNewCodeByIdentifier(
            email,
            true,
        );

        const confirmationLink = `${config.host}/users/confirm-otp/${OTP_UPDATE_EMAIL}/${otpCode}?identifier=${email}&new_identity=${newEmail}`;
        await this.emailNotificationService.sendEmail(
            'Notifikasi perubahan email',
            { email: newEmail, confirmationLink },
            'change-email',
            newEmail,
        );
    }

    async sendPhoneNumberUpdateConfirmation(
        dataUser: UserUpdatePhoneNumberRequest,
    ): Promise<void> {
        const userId = this.request.user['id'] || null;
        const phoneNumber = this.request.user['phoneNumber'] || null;
        const isPhoneNumberExists = await this.isPhoneExists(
            dataUser.newPhoneNumber,
            userId,
        );
        if (!phoneNumber) {
            throw new BadRequestException('Kamu tidak punya noTelp');
        } else if (isPhoneNumberExists) {
            throw new BadRequestException('Nomor telepon sudah terpakai');
        }

        const otpCode = await this.otpService.createNewCodeByIdentifier(
            dataUser.newPhoneNumber,
            true,
        );
        this.smsNotificationService.sendSMS(
            userId,
            'SMS OTP Perubahan Nomor Telepon kamu adalah : ' + otpCode,
            dataUser.newPhoneNumber,
        );
    }

    async accountDelete() {
        const userId = this.request.user['id'] || null;

        await Promise.all([
            this.update(userId, <IUser>{
                deletedAt: new Date(),
            }),
            this.softDelete(userId),
        ]);
    }

    async findOneByPhoneNumber(phoneNumber: string): Promise<IUser> {
        return await this.userRepository.findOneOrFail({
            where: { phoneNumber },
        });
    }

    async isEmailExists(email: string, exceptId = 0): Promise<boolean> {
        const user = await this.userRepository.findOneByEmailExceptId(
            email,
            exceptId,
        );

        return user !== null;
    }

    async isPhoneExists(phoneNumber: string, exceptId = 0): Promise<boolean> {
        const user = await this.userRepository.findOneByPhoneNumberExceptId(
            phoneNumber,
            exceptId,
        );

        return user !== null;
    }

    @CacheClear(config.cache.name.users.detail, config.cache.name.users.list)
    async updatePassword(userId: number, newPassword: string): Promise<void> {
        await this.userRepository.update(
            {
                id: userId,
            },
            {
                password: newPassword,
            },
        );
    }

    @CacheClear(config.cache.name.users.detail, config.cache.name.users.list)
    async updateEmail(userId: number, newEmail: string): Promise<void> {
        await this.userRepository.update(
            {
                id: userId,
            },
            {
                email: newEmail,
            },
        );
    }

    @CacheClear(config.cache.name.users.detail, config.cache.name.users.list)
    async updateEmailByOldEmail(
        oldEmail: string,
        newEmail: string,
    ): Promise<void> {
        await this.userRepository.update(
            {
                email: oldEmail,
            },
            {
                email: newEmail,
            },
        );
    }

    @CacheClear(config.cache.name.users.detail, config.cache.name.users.list)
    async updatePhoneNumberByPhoneNumber(
        phoneNumber: string,
        newPhoneNumber: string,
    ): Promise<void> {
        await this.userRepository.update(
            {
                phoneNumber,
            },
            {
                phoneNumber: newPhoneNumber,
            },
        );
    }

    async findOneById(id: number): Promise<IUser> {
        return await this.userRepository.findOneOrFail({
            where: {
                id,
            },
        });
    }

    @CacheClear(config.cache.name.users.detail)
    async update(id: number, data: IUser): Promise<UpdateResult> {
        const updateResult = await this.userRepository.update(
            { id },
            { ...data },
        );

        if (updateResult.affected < 1) {
            throw new QueryFailedError('Error, Data not changed', null, null);
        }

        return updateResult;
    }

    @CacheClear(config.cache.name.users.detail)
    async softDelete(id: number): Promise<boolean> {
        const status = await this.userRepository.softDelete({ id });
        if (status.affected < 1) {
            throw new QueryFailedError('Error, Data not deleted', null, null);
        }

        return true;
    }
}
