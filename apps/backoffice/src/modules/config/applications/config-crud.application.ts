import { Injectable } from '@nestjs/common';
import { IConfig } from 'interface-models/config/config.interface';
import { ConfigCreateRequest } from '../requests/config-create.request';
import { ConfigResponse } from '../responses/config.response';
import { ConfigService } from '../services/config.service';
import { ConfigEditRequest } from '../requests/config-edit.request';
import { CacheService } from 'apps/backoffice/src/infrastructure/cache/services/cache.service';
import { config } from 'apps/backoffice/src/config';

@Injectable()
export class ConfigCrudApplication {
    constructor(
        private readonly configService: ConfigService,
        private readonly cacheService: CacheService,
    ) {}

    async create(configRequest: ConfigCreateRequest): Promise<ConfigResponse> {
        this.cacheService.cleanCacheMatches([
            config.cache.name.configs.detail,
            config.cache.name.configs.list,
        ]);
        const newConfig = <IConfig>{};

        newConfig.name = configRequest.name;
        newConfig.value = configRequest.value;

        const createConfig = await this.configService.create(newConfig);

        return {
            id: createConfig.id,
            name: createConfig.name,
            key: createConfig.key,
            value: createConfig.value,
        };
    }

    async edit(
        id: number,
        configRequest: ConfigEditRequest,
    ): Promise<ConfigResponse> {
        this.cacheService.cleanCacheMatches([
            config.cache.name.configs.detail,
            config.cache.name.configs.list,
        ]);
        await this.configService.findOneById(id);
        const editConfig = <IConfig>{};

        editConfig.name = configRequest.name;
        editConfig.value = configRequest.value;

        const updateConfig = await this.configService.update(id, editConfig);

        return {
            id: updateConfig.id,
            name: updateConfig.name,
            key: updateConfig.key,
            value: updateConfig.value,
        };
    }

    async delete(id: number): Promise<void> {
        this.cacheService.cleanCacheMatches([
            config.cache.name.configs.detail,
            config.cache.name.configs.list,
        ]);
        await this.configService.findOneById(id);
        await this.configService.delete(id);
    }

    async findById(id: number): Promise<IConfig> {
        const cacheName = await this.cacheService.getNameCacheDetailNumber(
            config.cache.name.configs.detail,
            id,
        );
        const cacheData = await this.cacheService.getCache<IConfig>(cacheName);
        if (cacheData != null) {
            return cacheData;
        }

        const data = await this.configService.findOneById(id);

        await this.cacheService.setCache<IConfig>(cacheName, data);

        return data;
    }
}
