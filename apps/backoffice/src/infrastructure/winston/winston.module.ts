import { Module } from '@nestjs/common';
import { WinstonModule as NestWinstonModule } from 'nest-winston';
import * as winston from 'winston';

@Module({
    imports: [
        NestWinstonModule.forRoot({
            transports: [
                // Create log file
                new winston.transports.File({
                    filename: 'info.log',
                    format: winston.format.combine(
                        winston.format.timestamp(),
                        winston.format.json(),
                    ),
                }),

                // Show log in console, add your log level here
                // Error Log
                new winston.transports.Console({
                    level: 'error',
                    format: winston.format.combine(
                        winston.format.colorize({
                            all: true,
                        }),
                        winston.format.timestamp({
                            format: 'YYYY-MM-DD hh:mm:ss.SSS A',
                        }),
                        winston.format.align(),
                        winston.format.printf(
                            ({ timestamp, level, message, context, trace }) => {
                                message = message.trim();
                                // // Create breadcrumb for Sentry
                                // Sentry.addBreadcrumb({
                                //     category: 'console',
                                //     message: message,
                                //     level: 'error',
                                //     type: 'Error',
                                // });

                                if (context) {
                                    return `${timestamp} [${context}] ${level}: ${message}${
                                        trace ? `\n${trace}` : ''
                                    }`;
                                } else {
                                    return `${timestamp} ${level}: ${message}${
                                        trace ? `\n${trace}` : ''
                                    }`;
                                }
                            },
                        ),
                    ),
                }),
            ],
        }),
    ],
    controllers: [],
    providers: [],
    exports: [],
})
export class WinstonModule {}
