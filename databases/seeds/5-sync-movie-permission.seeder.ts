import { Connection, In } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import * as permissions from 'constants/permission.constant';

import { Permission } from '../../entities/iam/permission.entity';
import { Logger } from '@nestjs/common';

export class SyncPermissionSeederMovie implements Seeder {
    private readonly logger = new Logger(SyncPermissionSeederMovie.name);

    public async run(factory: Factory, connection: Connection): Promise<void> {
        const repository = connection.getRepository(Permission);

        const permissionConstants = [
            permissions.PERMISSION_BACKOFFICE_SHOW_MOVIE,
            permissions.PERMISSION_BACKOFFICE_DETAIL_MOVIE,
            permissions.PERMISSION_BACKOFFICE_UPDATE_MOVIE,
            permissions.PERMISSION_BACKOFFICE_CREATE_MOVIE,
            permissions.PERMISSION_BACKOFFICE_DELETE_MOVIE,
            permissions.PERMISSION_BACKOFFICE_SYNC_MOVIE,
        ];

        const permissionExists = await repository.findBy({
            key: In(permissionConstants),
        });

        const permissionExistsKey = permissionExists.map((data) => data.key);

        const permissionSync = permissionConstants.map(
            async (permissionKey) => {
                if (!permissionExistsKey.includes(permissionKey)) {
                    const newPermission = repository.create();

                    newPermission.key = permissionKey;
                    newPermission.name = permissionKey
                        .split('-')
                        .join(' ')
                        .toUpperCase();

                    return newPermission;
                } else {
                    return new Permission();
                }
            },
        );

        const saveData = await Promise.all(permissionSync);
        await repository.save(saveData as Permission[]);
    }
}
