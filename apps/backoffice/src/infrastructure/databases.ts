import { Span } from '@sentry/tracing';
import { config } from 'apps/backoffice/src/config';
import { DatabaseLogger } from 'databases/applications/dababase.logger';
import { Config } from 'entities/config/config.entity';
import { Permission } from 'entities/iam/permission.entity';
import { Role } from 'entities/iam/role.entity';
import { User } from 'entities/iam/user.entity';
import { LogActivity } from 'entities/log-activity/log-activity.entity';
import { InAppNotification } from 'entities/notification/in-app-notification.entity';
import { Otp } from 'entities/otp/otp.entity';
import { ConnectionOptions, createConnection } from 'typeorm';
import { SentryQueryService } from './sentry/sentry-query.service';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const connectionOption: ConnectionOptions = {
    type: 'mysql',
    host: config.database.host,
    port: +config.database.port,
    username: config.database.username,
    password: config.database.password,
    database: config.database.database,
    entities: [
        User,
        Role,
        InAppNotification,
        Permission,
        Otp,
        Config,
        LogActivity,
    ],
    synchronize: false,
    logging: config.nodeEnv === 'local',
    charset: 'utf8mb4_unicode_ci',
    namingStrategy: new SnakeNamingStrategy(),
    maxQueryExecutionTime: +config.database.maxQueryExecutionTimeInMs,
    logger: new DatabaseLogger(new SentryQueryService(), new Span()),
};

export const databaseConnection = createConnection(connectionOption);
