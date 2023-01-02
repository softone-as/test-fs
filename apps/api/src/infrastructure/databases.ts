import { config } from 'apps/api/src/config';
import { Config } from 'entities/config/config.entity';
import { Permission } from 'entities/iam/permission.entity';
import { RolePermission } from 'entities/iam/role-permission.entity';
import { Role } from 'entities/iam/role.entity';
import { UserAddress } from 'entities/iam/user-addresses.entity';
import { User } from 'entities/iam/user.entity';
import { InAppNotification } from 'entities/notification/in-app-notification.entity';
import { Otp } from 'entities/otp/otp.entity';
import { City } from 'entities/region/city.entity';
import { Country } from 'entities/region/country.entity';
import { District } from 'entities/region/district.entity';
import { Region } from 'entities/region/region.entity';

import { ConnectionOptions, createConnection } from 'typeorm';

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
        Otp,
        Permission,
        InAppNotification,
        City,
        Region,
        Country,
        District,
        UserAddress,
        Config,
        RolePermission,
    ],
    synchronize: false,
    logging: config.nodeEnv === 'local',
    charset: 'utf8mb4_unicode_ci',
};

export const databaseConnection = createConnection(connectionOption);
