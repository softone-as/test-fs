import { CacheModule as CacheModuleManager } from '@nestjs/cache-manager';
import { CacheService } from './services/cache.service';
import * as redisStore from 'cache-manager-redis-store';
import { config } from '../../config';
import { Module } from '@nestjs/common';

@Module({
    imports: [
        CacheModuleManager.register({
            store: redisStore,
            host: config.redis.host,
            port: config.redis.port,
            ttl: 60,
        }),
    ],
    providers: [CacheService],
    exports: [CacheService],
})
export class CacheModule {}
