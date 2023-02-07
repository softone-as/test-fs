import { Span } from '@sentry/tracing';
import { config } from 'apps/backoffice/src/config';
import { DatabaseLogger } from 'databases/applications/dababase.logger';
import { Config } from 'entities/config/config.entity';
import { Permission } from 'entities/iam/permission.entity';
import { RolePermission } from 'entities/iam/role-permission.entity';
import { Role } from 'entities/iam/role.entity';
import { User } from 'entities/iam/user.entity';
import { LogActivity } from 'entities/log-activity/log-activity.entity';
import { InAppNotification } from 'entities/notification/in-app-notification.entity';
import { Otp } from 'entities/otp/otp.entity';
import { ConnectionOptions, createConnection } from 'typeorm';
import { SentryQueryService } from './sentry/sentry-query.service';

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
        RolePermission,
        Otp,
        Config,
        LogActivity,
    ],
    synchronize: false,
    logging: config.nodeEnv === 'local',
    charset: 'utf8mb4_unicode_ci',
    maxQueryExecutionTime: +config.database.maxQueryExecutionTimeInSeconds,
    logger: new DatabaseLogger(new SentryQueryService(), Span as any) as any,
};

export const databaseConnection = createConnection(connectionOption);
