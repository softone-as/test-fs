import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAddress } from 'entities/iam/user-addresses.entity';
import { User } from 'entities/iam/user.entity';
import { Otp } from 'entities/otp/otp.entity';
import { City } from 'entities/region/city.entity';
import { District } from 'entities/region/district.entity';
import { HttpModule } from 'nestjs-http-promise';
import { CacheModule } from '../../infrastructure/cache/cache.module';
import { EmailNotificationService } from '../../infrastructure/notification/services/email-notification.service';
import { GoSmsApiNotificationService } from '../../infrastructure/notification/services/gosmsapi-notification.service';
import { OtpService } from '../auth/services/otp.service';
import { RegionService } from '../region/services/region.service';
import { UserAddressIndexApplication } from './applications/user-address-index.application';
import { UserAddressApplication } from './applications/user-address.application';
import { UserApplication } from './applications/user.application';
import { UserAddressController } from './controllers/v1/user-address.controller';
import { UserController } from './controllers/v1/user.controller';
import { UserAddressService } from './services/user-address.service';
import { UserService } from './services/user.service';

@Module({
    imports: [
        HttpModule.register({
            timeout: 60000,
            retries: 5,
        }),
        TypeOrmModule.forFeature([User, UserAddress, Otp, District, City]),
        CacheModule,
    ],
    controllers: [UserAddressController, UserController],
    providers: [
        UserService,
        UserAddressService,
        EmailNotificationService,
        OtpService,
        UserApplication,
        UserAddressApplication,
        UserAddressIndexApplication,
        RegionService,
        GoSmsApiNotificationService,
    ],
    exports: [UserService],
})
export class UserModule {}
