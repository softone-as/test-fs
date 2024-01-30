import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'entities/iam/user.entity';
import { HttpModule } from 'nestjs-http-promise';
import { CacheModule } from '../../infrastructure/cache/cache.module';
import { UserController } from './controllers/v1/user.controller';
import { UserService } from './services/user.service';
import { UserRepository } from './repositories/user.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [
        HttpModule.register({
            timeout: 60000,
            retries: 5,
        }),
        TypeOrmModule.forFeature([User]),
        CacheModule,
        AuthModule,
    ],
    controllers: [UserController],
    providers: [UserService, UserRepository],
    exports: [UserService],
})
export class UserModule {}
