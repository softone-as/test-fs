import { Module } from '@nestjs/common';
import { WinstonModule as NestWinstonModule } from 'nest-winston';
import * as winston from 'winston';
import * as Sentry from '@sentry/node';
import 'winston-daily-rotate-file';

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
                                message = message.toString().trim();
                                let logMessage: string;

                                if (context) {
                                    logMessage = `${timestamp} [${context}] ${level}: ${message}${
                                        trace ? `\n${trace}` : ''
                                    }`;
                                } else {
                                    logMessage = `${timestamp} ${level}: ${message}${
                                        trace ? `\n${trace}` : ''
                                    }`;
                                }

                                // Remove color from log message
                                const cleanLogMesage = logMessage.replace(
                                    /\x1B\[\d+m/g,
                                    '',
                                );

                                // NestApplication & RouterExplorer no need to create breadcrumb for Sentry
                                const NestIntializationContexts = [
                                    'NestApplication',
                                    'RouterExplorer',
                                    'RoutesResolver',
                                ];

                                if (
                                    !NestIntializationContexts.includes(context)
                                ) {
                                    // Create breadcrumb for Sentry
                                    Sentry.addBreadcrumb({
                                        category: 'console',
                                        message: cleanLogMesage,
                                        level: 'error',
                                        type: 'error',
                                    });
                                }

                                return logMessage;
                            },
                        ),
                    ),
                }),

                // Debug Log
                new winston.transports.Console({
                    level: 'debug',
                    handleExceptions: false,
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
                                message = message.toString().trim();
                                let logMessage: string;

                                if (context) {
                                    logMessage = `${timestamp} [${context}] ${level}: ${message}${
                                        trace ? `\n${trace}` : ''
                                    }`;
                                } else {
                                    logMessage = `${timestamp} ${level}: ${message}${
                                        trace ? `\n${trace}` : ''
                                    }`;
                                }

                                // Remove color from log message
                                const cleanLogMesage = logMessage.replace(
                                    /\x1B\[\d+m/g,
                                    '',
                                );

                                // NestApplication & RouterExplorer no need to create breadcrumb for Sentry
                                const NestIntializationContexts = [
                                    'NestApplication',
                                    'RouterExplorer',
                                    'RoutesResolver',
                                ];
                                if (
                                    !NestIntializationContexts.includes(context)
                                ) {
                                    // Create breadcrumb for Sentry
                                    Sentry.addBreadcrumb({
                                        category: 'console',
                                        message: cleanLogMesage,
                                        level: 'info',
                                        type: 'debug',
                                    });
                                }

                                return logMessage;
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
