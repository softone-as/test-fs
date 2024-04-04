import * as winston from 'winston';
import * as Sentry from '@sentry/node';

export class WinstonUtils {
    static printLog(
        timestamp: Date,
        level: string,
        message: string,
        context: string,
        breadcrumbLevel: Sentry.SeverityLevel,
        breadcrumbType: string,
        trace?: Record<string, unknown>,
    ): string {
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
        const cleanLogMesage = logMessage.replace(/\x1B\[\d+m/g, '');

        // NestApplication & RouterExplorer no need to create breadcrumb for Sentry
        const NestIntializationContexts = [
            'NestApplication',
            'RouterExplorer',
            'RoutesResolver',
        ];

        if (!NestIntializationContexts.includes(context)) {
            // Create breadcrumb for Sentry
            Sentry.addBreadcrumb({
                category: 'console',
                message: cleanLogMesage,
                level: breadcrumbLevel,
                type: breadcrumbType,
            });
        }

        return logMessage;
    }

    static winstonErrorConsole(): winston.transports.ConsoleTransportInstance {
        return new winston.transports.Console({
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
                        return WinstonUtils.printLog(
                            timestamp,
                            level,
                            message,
                            context,
                            'error',
                            'error',
                            trace,
                        );
                    },
                ),
            ),
        });
    }

    static winstonDebugConsole(): winston.transports.ConsoleTransportInstance {
        return new winston.transports.Console({
            level: 'debug',
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
                        return WinstonUtils.printLog(
                            timestamp,
                            level,
                            message,
                            context,
                            'info',
                            'debug',
                            trace,
                        );
                    },
                ),
            ),
        });
    }
}
