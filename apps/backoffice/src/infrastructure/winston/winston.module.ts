import { Module } from '@nestjs/common';
import { WinstonModule as NestWinstonModule } from 'nest-winston';
import * as winston from 'winston';
import 'winston-daily-rotate-file';
import { WinstonUtils } from './winston.util';

@Module({
    imports: [
        NestWinstonModule.forRoot({
            transports: [
                // Create log file
                new winston.transports.DailyRotateFile({
                    filename: 'log-%DATE%.log',
                    dirname: 'apps/backoffice/logs',
                    datePattern: 'YYYY-MM-DD',
                    zippedArchive: true,
                    maxSize: '20m',
                    format: winston.format.combine(
                        winston.format.timestamp(),
                        winston.format.json(),
                    ),
                }),

                // Error Log
                WinstonUtils.winstonErrorConsole(),
                // Debug Log
                WinstonUtils.winstonDebugConsole(),
            ],
        }),
    ],
    controllers: [],
    providers: [],
    exports: [],
})
export class WinstonModule {}
