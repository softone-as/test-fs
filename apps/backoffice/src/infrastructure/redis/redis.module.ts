import { Module } from '@nestjs/common';
import redis from 'redis';
import { REDIS } from '../contants';
import { config } from 'apps/backoffice/src/config';

@Module({
    providers: [
        {
            provide: REDIS,
            useValue: redis.createClient(
                config.redis.isEnable == 'true'
                    ? {
                          port: +config.redis.port,
                          host: config.redis.host,
                          password: config.redis.password,
                      }
                    : {},
            ),
        },
    ],
    exports: [REDIS],
})
export class RedisModule {}
