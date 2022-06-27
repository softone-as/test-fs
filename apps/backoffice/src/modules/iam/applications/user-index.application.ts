import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginateResponse } from 'apps/backoffice/src/common/interface/index.interface';
import { IndexApplication } from 'apps/backoffice/src/infrastructure/applications/index.application';
import { User } from 'entities/iam/user.entity';
import { Repository } from 'typeorm';
import { UserIndexRequest } from '../requests/user-index.request';
import { CacheService } from 'apps/backoffice/src/infrastructure/cache/services/cache.service';
import { config } from 'apps/backoffice/src/config';

const ALLOW_TO_SORT = ['latest', 'oldest', 'fullname'];

@Injectable()
export class UserIndexApplication extends IndexApplication {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly cacheService: CacheService,
    ) {
        super();
    }

    async fetch(request: UserIndexRequest): Promise<IPaginateResponse<User>> {
        const cacheName = await this.cacheService.getNameCacheIndex(
            config.cache.name.users.list,
            request,
        );
        const cacheData = await this.cacheService.getCache<
            IPaginateResponse<User>
        >(cacheName);
        if (cacheData != null) {
            return cacheData;
        }

        const query = this.userRepository.createQueryBuilder('user');

        if (request.search) {
            query.where(`concat(user.fullname, ' ', user.id) like :search`, {
                search: `%${request.search}%`,
            });
        }

        if (request.sort == 'latest') {
            query.orderBy('user.createdAt', 'DESC');
        } else if (request.sort == 'oldest') {
            query.orderBy('user.createdAt', 'ASC');
        } else {
            query.orderBy(
                ALLOW_TO_SORT.indexOf(request.sort) >= 0
                    ? request.sort ?? `user.${ALLOW_TO_SORT[0]}`
                    : `user.createdAt`,
                this.getOrder(request.order),
            );
        }

        query.take(request.perPage ?? 10);
        query.skip(this.countOffset(request));

        const [data, count] = await query.getManyAndCount();

        const meta = this.mapMeta(count, request);

        const results = {
            data,
            meta,
        };

        await this.cacheService.setCache<IPaginateResponse<User>>(
            cacheName,
            results,
        );

        return results;
    }
}
