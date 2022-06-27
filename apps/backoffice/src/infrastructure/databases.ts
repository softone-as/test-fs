import { config } from 'apps/backoffice/src/config';
import { Warning } from 'entities/alert/warning.entity';
import { Base } from 'entities/base/base.entity';
import { Config } from 'entities/config/config.entity';
import { Content } from 'entities/content/content.entity';
import { DepositHistory } from 'entities/deposit/deposit-history.entity';
import { DepositItem } from 'entities/deposit/deposit-item.entity';
import { Deposit } from 'entities/deposit/deposit.entity';
import { Permission } from 'entities/iam/permission.entity';
import { RolePermission } from 'entities/iam/role-permission.entity';
import { Role } from 'entities/iam/role.entity';
import { UserAddress } from 'entities/iam/user-addresses.entity';
import { User } from 'entities/iam/user.entity';
import { InAppNotification } from 'entities/notification/in-app-notification.entity';
import { Otp } from 'entities/otp/otp.entity';
import { PoinHistory } from 'entities/poin/poin-history.entity';
import { ProductCategory } from 'entities/product/product-category.entity';
import { Product } from 'entities/product/product.entity';
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
        Base,
        Warning,
        InAppNotification,
        Deposit,
        PoinHistory,
        DepositItem,
        DepositHistory,
        Permission,
        RolePermission,
        Country,
        Content,
        Otp,
        Config,
        City,
        District,
        Region,
        Product,
        ProductCategory,
        UserAddress,
    ],
    synchronize: false,
    logging: config.nodeEnv === 'local',
    charset: 'utf8mb4_unicode_ci',
};

export const databaseConnection = createConnection(connectionOption);
